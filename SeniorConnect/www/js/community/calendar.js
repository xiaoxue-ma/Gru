//'use strict';
var calendar = angular
  .module('calendar', ['mwl.calendar', 'ui.bootstrap', 'ngTouch', 'ngAnimate']);
calendar.controller('CommunityCalendarCtrl', function ($scope) {
    var vm = this;
    //These variables MUST be set as a minimum for the calendar to work
    vm.calendarView = 'month';
    vm.calendarDay = new Date();
    vm.events = [
      {
        title: 'An event',
        type: 'warning',
        startsAt: 'Oct 02 2015 09:00:00 GMT+0800',
        endsAt: 'Oct 11 2015 08:00:00 GMT+0800',
        draggable: false,
        resizable: false
      }, {
        title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
        type: 'info',
        startsAt: 'Oct 09 2015 18:33:24 GMT+0800',
        //endsAt: moment().add(5, 'days').toDate(),
        endsAt:'Oct 10 2015 20:32:01 GMT+0800',
        draggable: false,
        resizable: false
      }, {
        title: 'This is a really long event title that occurs on every year',
        type: 'important',
        startsAt: 'Sat Oct 10 2015 07:00:00 GMT+0800',
        endsAt: 'Sat Oct 10 2015 19:00:00 GMT+0800',
        recursOn: 'year',
        draggable: false,
        resizable: false
      }
    ];
    console.log(vm.events);
    $scope.vm = vm;
  });
