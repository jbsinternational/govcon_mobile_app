app.service('GlobalService', function ($location, $cookies) {

  this.errorMessage = null;

  this.eventNid = null;

  this.checkedEvents = [];

  this.attendingEvents = [];

  this.isOverdueDay = function (day) {
    var today = $moment().format('yyMMdd');
    if (day>today) {
      return true;
    }
    else {
      return false;
    }
  }

  this.getScheduleDayPageTitle = function (day) {

    if (isNaN(day)) {
      day = day.toLowerCase();
    }

    if (day == 22 || day == 'wednesday') {
      return 'Wednesday - July 22';
    }
    else if (day == 23 || day == 'thursday') {
      return 'Thursday - July 23';
    }
    else if (day == 24 || day == 'friday') {
      return 'Friday - July 24';
    }
    else if (day == 'about') {
      return 'About';
    }
    else {
      return '???';
    }

  };

  this.servicesUrl = function() {
    var absUrl = $location.absUrl();
    if (absUrl.indexOf('localhost') > -1) {
      return 'http://localhost/govdays/services/';
    }
    else {
      return 'http://govdays.rmworks.net/services/';
    }
  }

  this.getCheckedEventsCookie = function () {
    var fromStore = $cookies.get("jbsGovConSchedule_CheckedEvents");
    for (i in fromStore) {
      this.checkedEvents[fromStore[i]] = true;
    }
  }

  this.setCheckedEventsCookie = function () {
    var toStore = [];
    angular.forEach(this.checkedEvents , function(value, key) {
      if (value) {
        toStore.push(key);
      }
    });
    var now = new Date(),
    exp = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 365);
    $cookies.put('jbsGovConSchedule_CheckedEvents', toStore, { expires: exp });
  }

});