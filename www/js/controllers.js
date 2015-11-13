angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope) {
})

.controller('TemperatureCtrl', function($scope, $interval) {
    
    var stop ;
    $scope.$on('$ionicView.enter', function(){
        
        function getTemperature(values) {
            $scope.temperature = values[0];
        };

        document.addEventListener("deviceready", function () {

        sensors.disableSensor();
        sensors.enableSensor("AMBIENT_TEMPERATURE");
            
        stop = $interval(function(){
          sensors.getState(getTemperature);
        }, 100);

        }, false); 
    });
    
    $scope.StopTimer = function(){

        if( angular.isDefined(stop)) {
            $interval.cancel(stop);
            stop = undefined;
        }
        
        sensors.disableSensor();
    }
})

.controller('PressureCtrl', function($scope, $interval) {

    var stop ;
    $scope.$on('$ionicView.enter', function(){
        
        function getPressure(values) {
            $scope.pressure = values[0];
        };

        document.addEventListener("deviceready", function () {
            
        sensors.disableSensor();
        sensors.enableSensor("PRESSURE");

        stop = $interval(function(){
          sensors.getState(getPressure);
        }, 100);

        }, false); 
    });
    
    $scope.StopTimer = function(){

        if( angular.isDefined(stop)) {
            $interval.cancel(stop);
            stop = undefined;
        }
        
        sensors.disableSensor();
    }
})

.controller('VibrationCtrl', function($scope, $cordovaVibration) {
    
    $scope.showing_spike = function(){
        drawing_spike();
    }
    
    var drawing_x_y_lines = function() {
        
        // Drawing X - Y Line Graph
        
        var viewing_width = document.getElementById("panel_container").clientWidth - 32;
        document.getElementById("line").setAttribute("width",viewing_width);
        
        var lineData = [
            {
              x: 0,
              y: 0
            }, {
              x: 100,
              y: 100
            }
        ];
        
        var panel_width = document.getElementById("line").clientWidth + 20;
        var vis = d3.select('#line'),
            WIDTH = panel_width ,
            HEIGHT = 400,
            MARGINS = {
              top: 20,
              right: 20,
              bottom: 20,
              left: 50
            },
            xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(lineData, function(d) {
              return d.x;
            })]),
            yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(lineData, function(d) {
              return d.y;
            })]),
            xAxis = d3.svg.axis()
              .scale(xRange)
              .tickSize(5)
              .tickSubdivide(true),
            yAxis = d3.svg.axis()
              .scale(yRange)
              .tickSize(5)
              .orient('left')
              .tickSubdivide(true);
        
        vis.append('svg:g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom - 180) + ')')
          .call(xAxis);

        vis.append('svg:g')
          .attr('class', 'y axis')
          .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
          .call(yAxis);
        
    }
    var drawing_spike = function () {
                
        // Drawing Spike
        $cordovaVibration.vibrate(1000);
        
        var svg = d3.select("#spike");
        svg.selectAll("*").remove();
        
        
        var w = document.getElementById("line").clientWidth;
        var h = 300;
        
        document.getElementById("spike").setAttribute("width",w);
        
        var svg = d3.select("#spike")
          .append("svg")
          .attr("width", w)
          .attr("height", h)

        var data = d3.range(11).map(function(){return Math.random()*10});
        var x = d3.scale.linear().domain([0, 10]).range([50, w]);
        var y = d3.scale.linear().domain([0, 10]).range([10, 290]);
        var line = d3.svg.line()
          .interpolate("cardinal")
          .x(function(d,i) {return x(i);})
          .y(function(d) {return y(d);})

        var path = svg.append("path")
          .attr("d", line(data))
          .attr("stroke", "red")
          .attr("stroke-width", "2")
          .attr("fill", "none");

        var totalLength = path.node().getTotalLength();

        path
          .attr("stroke-dasharray", totalLength + " " + totalLength)
          .attr("stroke-dashoffset", totalLength)
          .transition()
            .duration(1000)
            .ease("linear")
            .attr("stroke-dashoffset", 0);
    }
    
    $scope.$on('$ionicView.enter', function(){
        
        drawing_x_y_lines();
        
    });
});