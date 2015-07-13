app.service('GlobalService', function ($location, $cookies) {

  var generateID = function () {
    var result = '';
    for (var i = 0; i<64; i++) {
      var x = Math.floor((Math.random() * 26) + 97);
      result = result + String.fromCharCode(x);
    }
    return result;
  }

  this.errorMessage = null;

  this.scheduleDay = null;

  this.eventNid = null;

  this.checkedEvents = [];

  this.attendingEvents = [];

  this.getNow = function () {
    return new Date('2015-07-23T11:30').getTime();
    //return Date.now();
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

  this.checkUniqueID = function () {
    var uniqueID =  $cookies.get("jbsGovConSchedule_UniqueId");
    if (!uniqueID) {
      uniqueID = generateID();
      var now = new Date();
      var exp = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 365);
      $cookies.put('jbsGovConSchedule_UniqueId', uniqueID, { expires: exp });
      return uniqueID;
    }
    else {
      return false;
    }
  }

});