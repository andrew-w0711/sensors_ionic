angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope) {})

.controller('TemperatureCtrl', function($scope, $interval) {
    
    function onSuccess(values) {
          $scope.temperature = values[0];
      };

      document.addEventListener("deviceready", function () {

        sensors.enableSensor("AMBIENT_TEMPERATURE");

        $interval(function(){
          sensors.getState(onSuccess);
        }, 100);


      }, false);
})

.controller('VibrationCtrl', function($scope) {})

.controller('PressureCtrl', function($scope) {});
