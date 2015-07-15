'use strict';
app.controller('MainController', function ($scope, DayScheduleFactory, GlobalService, RegisterAppFactory) {

  var checkUniqueID = function() {
    var newUniqueID = GlobalService.checkUniqueID();
    if (newUniqueID) {
      RegisterAppFactory(newUniqueID, 'generic');
    }
  }

  var sessionsAllLists = [];
  sessionsAllLists[0] = [];
  sessionsAllLists[1] = [];
  sessionsAllLists[2] = [];

  var aggregateTheList = function (list) {
    var agragatedList = [];
    var events = [];
    var aTime = list[0].node.time;
    var counter = 0;
    for (var i in list) {
      if (list[i].node.time != aTime) {
        agragatedList.push({ 'time' : aTime, 'events' : events });
        aTime = list[i].node.time;
        events = [];
        counter = 0;
      }
      events.push({
        'title' : list[i].node.title,
        'room': list[i].node.room,
        'nid': list[i].node.nid,
        'attending' : GlobalService.checkedEvents[list[i].node.nid],
        'counter' : i
      });
    }
    agragatedList.push({ 'time' : aTime, 'events' : events });
    return agragatedList;
  }

  $scope.errorMessage = null;

  $scope.sessionsList = null;

  $scope.scheduleTitle = null;

  $scope.loadingList = true;

  $scope.setScheduleTitle = function (day) {
    $scope.scheduleTitle = $scope.getScheduleDayPageTitle(day);
  }

  $scope.getScheduleDayPageTitle = function (day) {
    return GlobalService.getScheduleDayPageTitle(day);
  };

  $scope.getScheduleList = function (day) {
    $scope.sessionsList = [];
    GlobalService.scheduleDay = day;
    var index = day - 22;
    if (sessionsAllLists[index].length == 0) {
      $scope.loadingList = true;
      DayScheduleFactory(day)
        .then(function (response) {
          sessionsAllLists[index] = aggregateTheList(response.nodes);
          $scope.sessionsList = sessionsAllLists[index];
          $scope.loadingList = false;
          $scope.errorMessage = null;
        }, function (response) {
          $scope.errorMessage = 'Error: ' + response.Message;
          $scope.loadingList = false;
        });
    }
    else {
      $scope.sessionsList = sessionsAllLists[index];
    }
  }

  $scope.showSession = function (nid, title, time) {
    //alert(nid + ' ' + title + ' ' + time);
    GlobalService.eventNid = nid;
    scheduleNavigator.pushPage('event.html');
  }

  $scope.checkSession = function (nid) {
    GlobalService.checkedEvents[nid] = !GlobalService.checkedEvents[nid];
    GlobalService.setCheckedEventsCookie();
  }

  $scope.checkDayOverdue = function (scheduleDay) {
    var now = new Date(GlobalService.getNow());
    var day = now.getDate();
    if (day > scheduleDay) {
      return 'jbs-day-overdue';
    }
    else if (day < scheduleDay) {
      return 'jbs-not-day-overdue';
    }
    else {
      return 'jbs-day-occurring';
    }
  }

  GlobalService.getCheckedEventsCookie();
  checkUniqueID();

});
