'use strict';
app.controller('AttendingController', function ($scope, AttendingScheduleFactory, GlobalService) {


  var aggregateTheList = function (list) {
    var agragatedList = [];
    var events = [];
    var aDay = list[0].node.day;
    var counter = 0;
    for (var i in list) {
      if (list[i].node.day != aDay) {
        agragatedList.push({
          'day' : GlobalService.getScheduleDayPageTitle(aDay),
          'events' : events
        });
        aDay = list[i].node.day;
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
    agragatedList.push({
      'day' : GlobalService.getScheduleDayPageTitle(aDay),
      'events' : events
    });
    return agragatedList;
  }

  $scope.attendingEvents = [];

  $scope.loadingList = true;

  $scope.noAttending = false;

  var listOfAttendingNids = function () {
    var result = false;
    angular.forEach(GlobalService.checkedEvents , function(value, key) {
      if (value) {
        if (result) {
          result = result + '+' + key;
        }
        else {
          result = key;
        }
      }
    });
    return result;
  }

  var getAttendingScheduleList = function (day) {
    $scope.attendingEvents = [];
    $scope.loadingList = true;
    $scope.noAttending = false;
    AttendingScheduleFactory(listOfAttendingNids())
      .then(function (response) {
        if (response != [] && response != null && response != '' && response.nodes.length > 0) {
          $scope.attendingEvents = aggregateTheList(response.nodes);
        }
        else {
          $scope.noAttending = true;
        }
        $scope.loadingList = false;
      }, function (response) {
        $scope.errorMessage = response.Message;
        $scope.loadingList = false;
      });
  }

  $scope.showSession = function (nid, title, time) {
    GlobalService.eventNid = nid;
    scheduleNavigator.pushPage('event.html');
  }

  $scope.checkSession = function (nid) {
    GlobalService.checkedEvents[nid] = !GlobalService.checkedEvents[nid];
    GlobalService.setCheckedEventsCookie();
  }

  getAttendingScheduleList();

});
