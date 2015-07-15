app.factory('DayScheduleFactory', function ($http, $q, GlobalService) {
  return function (day) {

    var result = $q.defer();

    var urlDay = null;

    if (day == 22) {
      urlDay ='wednesday';
    }
    else if (day == 23) {
      urlDay ='thursday';
    }
    else if (day == 24) {
      urlDay ='friday';
    }

    $http({
      method: 'GET',
      url: GlobalService.servicesUrl()  + urlDay,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .success(function (response) {
        result.resolve(response);
      })
      .error(function (response) {
        result.reject(response);
      });

    return result.promise;
  }
});