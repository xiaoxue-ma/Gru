/**
 * Created by Boss on 11/10/15.
 */
angular.module('amChartsDirectiveExample',['amChartsDirective']).controller('amChartsController', ['$scope', '$q', '$timeout', function ($scope, $q, $timeout) {

  // this function returns our chart data as a promise
  this.dataFromPromise = function(){
    var deferred = $q.defer();

    var data = [{
      year: 2005,
      income: 23.5,
      expenses: 18.1
    }, {
      year: 2006,
      income: 26.2,
      expenses: 22.8
    }, {
      year: 2007,
      income: 30.1,
      expenses: 23.9
    }, {
      year: 2008,
      income: 29.5,
      expenses: 25.1
    }, {
      year: 2009,
      income: 24.6,
      expenses: 25
    }];

    deferred.resolve(data)
    return deferred.promise;
  };

  // We can optionally pass a promise to the options attribute on the AmChartsDirective
  // to delay the chart rendering until the promise resolves
  this.amChartOptions = $timeout(function(){
    return {
      // we can also use a promise for the data property to delay the rendering of
      // the chart till we actually have data
      data: this.dataFromPromise(),
      type: "serial",
      theme: 'black',
      categoryField: "year",
      rotate: true,
      pathToImages: 'https://cdnjs.cloudflare.com/ajax/libs/amcharts/3.13.0/images/',
      legend: {
        enabled: true
      },
      chartScrollbar: {
        enabled: true,
      },
      categoryAxis: {
        gridPosition: "start",
        parseDates: false
      },
      valueAxes: [{
        position: "top",
        title: "Million USD"
      }],
      graphs: [{
        type: "column",
        title: "Income",
        valueField: "income",
        fillAlphas: 1,
      }]
    }
  }.bind(this), 1000) // delay chart render by 1 second


}]);
