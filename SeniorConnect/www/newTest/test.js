var myapp = angular.module('myModule', []);

myapp.controller("ctrl", ['$scope', function ($scope) {
  // app controller generates data
  $scope.data = generateChartData();
}])


myapp.directive('activityChart', function () {
  return {
    restrict: 'EA',
    scope: {
      // bi directional binding will pass data array to isolated scope
      data: '=',
      title: '@'
    },
    controller: function ($scope) {
      // controller generates the chart configuration
      this.configuration = {
        "type": "serial",
        "categoryField": "time",
          "balloon":{
              "bulletSize": 5
          },
          "categoryAxis": {
              "minPeriod": "DD",
              "parseDates": true,
              "dashLength": 1,
              "minorGridEnabled": true,
              "twoLineMode": true,
              "axisColor": "#DADADA",
              "dateFormats":[{
                  period: 'fff',
                  format: 'JJ:NN:SS'
              }, {
                  period: 'ss',
                  format: 'JJ:NN:SS'
              }, {
                  period: 'mm',
                  format: 'JJ:NN'
              }, {
                  period: 'hh',
                  format: 'JJ:NN'
              }, {
                  period: 'DD',
                  format: 'DD'
              }, {
                  period: 'WW',
                  format: 'DD'
              }, {
                  period: 'MM',
                  format: 'MMM'
              }, {
                  period: 'YYYY',
                  format: 'YYYY'
              }]
          },

          "valueAxes": [{
              "id": "ValueAxis-1",
              "title": "",
              "axisAlpha":0,
              "dashLength":1

          }],

          "graphs": [{
              "bullet": "round",
              "bulletSize": 4,
              "bulletBorderColor":"#FFFFFF",
              "bulletBorderThickness":2,
              "bulletBorderAlpha":1,
              "id": "",
              "title": "",
              "valueField": "value",
              "type": "smoothedLine",
              "lineThickness": 2,
              "lineColor": "#158ff1"
          }],

          "chartCursor": {
              "cursorPosition": "mouse",
              "categoryBalloonDateFormat": "MM-DD",
              "pan":true
          },

          "dataDateFormat": "YYYY-MM-DD HH:NN:SS",


        "chartScrollbar": {},
        "trendLines": [],

        "guides": [],
        "allLabels": [],
        //"legend": {
        //  "useGraphSettings": true
        //},
        "titles": [{
          "id": "",
          "size": 15,
          "text": ""
        }],
        "dataProvider": $scope.data
      };
    },
    link: function (scope, element, attrs, ctrl) {
      // link function will generate the actual chart
      AmCharts.makeChart(element.get(0), ctrl.configuration);
    }
  }
});

// generates some random data
function generateChartData() {
  var chartData = [];
  var firstDate = new Date();
  firstDate.setDate(firstDate.getDate() - 200);

  for (var i = 0; i < 200; i++) {
    // we create date objects here. In your data, you can have date strings
    // and then set format of your dates using chart.dataDateFormat property,
    // however when possible, use date objects, as this will speed up chart rendering.
    var newDate = new Date(firstDate);
    newDate.setDate(newDate.getDate() + i);

    var value = Math.round(Math.random() * 20);

    chartData.push({
      time: newDate,
      value: value
    });
  }
  return chartData;
}
//]]>
