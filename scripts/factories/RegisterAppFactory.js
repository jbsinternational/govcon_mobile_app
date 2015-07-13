app.factory('RegisterAppFactory', function ($http, $q, GlobalService) {
  return function (uniqueID, deviceType) {

    var result = $q.defer();
    var apiPars = {
      "title": uniqueID,
      "type": deviceType
    };
    var url = GlobalService.servicesUrl()  +  'app_installs/' + JSON.stringify(apiPars) + '.json';

    $http({
      method: 'GET',
      url: url,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .success(function (response) {
        result.resolve(true);
      })
      .error(function (response) {
        result.reject(false);
      });

    return result.promise;
  }
});
//http://localhost/govdays/services/app_installs/{"title": "abcd", "type": "android"}.json