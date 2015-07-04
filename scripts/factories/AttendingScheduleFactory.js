app.factory('AttendingScheduleFactory', function ($http, $q, GlobalService) {
  return function (nidsList) {

    var result = $q.defer();

    $http({
      method: 'GET',
      url: GlobalService.servicesUrl()  + 'attending/' + nidsList,
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