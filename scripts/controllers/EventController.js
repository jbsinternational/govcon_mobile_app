app.controller('EventController', function ($scope, GlobalService, EventFactory) {

  $scope.eventObj = null;
  $scope.errorMessage = null;
  $scope.loadingList = true;

  var getEvent = function () {
    $scope.loadingList = true;
    EventFactory(GlobalService.eventNid)
      .then(function (response) {
        $scope.eventObj = response.nodes[0].node;
        $scope.loadingList = false;
        var a = 1;
      }, function (response) {
        $scope.errorMessage = response.Message;
        $scope.loadingList = false;
      });
  }

  getEvent();

});