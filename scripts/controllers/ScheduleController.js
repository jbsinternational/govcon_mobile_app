'use strict';
app.controller('ScheduleController', function ($scope, GlobalService) {

  $scope.checkEventOverdue = function (timeSlot) {

    var aTime = timeSlot.split('to');

    for (var i = 0; i<2; i++) {
      aTime[i] = aTime[i].trim().toLowerCase();
      var addHours = 0;
      if (aTime[i].indexOf('pm') > 0) {
        addHours = 12;
      }
      var aHour = aTime[i].split(':');
      aHour[0] = parseInt(aHour[0]);
      aHour[0] = aHour[0]<12  ? aHour[0] + addHours : aHour[0];
      aHour[0] = aHour[0]<10  ? '0' + aHour[0].toString() : aHour[0].toString() ;
      aHour[1] = aHour[1].replace('am', '');
      aHour[1] = aHour[1].replace('pm', '');
      aTime[i] = aHour[0] + ':' + aHour[1];
      aTime[i] = '2015-07-' + GlobalService.scheduleDay + 'T' + aTime[i];
    }

    var iniTime  = new Date(aTime[0]).getTime();
    var endTime  = new Date(aTime[1]).getTime();
    var now = GlobalService.getNow();

    if ( now < iniTime ) {
      return 'jbs-time-header jbs-event-not-overdue';
    }
    else if ( now > endTime ) {
      return 'jbs-time-header jbs-event-overdue';
    }
    else {
      return 'jbs-time-header jbs-event-occurring';
    }

  }

});