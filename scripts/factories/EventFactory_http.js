app.factory('EventFactory', function ($http, $q, GlobalService) {
  return function (nid) {

    var result = $q.defer();

    $http({
      method: 'GET',
      url: GlobalService.servicesUrl()  +  'event/' + nid,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .success(function (response) {
        result.resolve(response.nodes.node);
      })
      .error(function (response) {
        result.reject(response);
      });

    return result.promise;
  }
});