//'use strict';
var calendar = angular.module('calendar', ['mwl.calendar', 'ui.bootstrap', 'ngTouch', 'ngAnimate']);

calendar.controller('CommunityCalendarCtrl', function ($scope, Communitys) {
    var vm = this;
    //These variables MUST be set as a minimum for the calendar to work
    vm.calendarView = 'month';
    vm.calendarDay = new Date();

    vm.events = [];
    vm.communitys = Communitys.query();
    for (var i = 0; i < vm.communitys.length; i++) {
        if (vm.communitys[i].joined == true) {
            console.log(parseInt(vm.communitys[i].id));
            var events = vm.communitys[i].events;
            for ( var j= 0; j<events.length;j++){
                if (events[j].joined == true) {
                    var event = {
                        title: events[j].name,
                        draggable: false,
                        resizable: false,
                        editable: false,
                        deletable: false,
                        type: 'important'
                    };
                    if (events[j].date == 'Every day') {
                        event.startsAt = 'Oct 01 2015 ' + events[j].time.split('-')[0] + ' GMT+0800';
                        event.endsAt = 'Oct 31 2015 ' + events[j].time.split('-')[1] + ' GMT+0800';
                        event.type = 'success';
                        event.recrusOn = 'year'
                    } else {
                        event.startsAt = events[j].date + ' ' + events[j].time.split('-')[0] + ' GMT+0800';
                        event.endsAt = events[j].date + ' ' + events[j].time.split('-')[1] + ' GMT+0800';
                    }
                    vm.events.push(event);
                }
            }
        }
    }
    //
    //vm.events = [
    //    {
    //        title: 'An event',
    //        type: 'warning',
    //        startsAt: 'Oct 02 2015 09:00 GMT+0800',
    //        endsAt: 'Oct 11 2015 08:00 GMT+0800',
    //        draggable: false,
    //        resizable: false
    //    }, {
    //        title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
    //        type: 'info',
    //        startsAt: 'Oct 09 2015 18:33 GMT+0800',
    //        //endsAt: moment().add(5, 'days').toDate(),
    //        endsAt: 'Oct 10 2015 20:32 GMT+0800',
    //        draggable: false,
    //        resizable: false
    //    }, {
    //        title: 'This is a really long event title that occurs on every year',
    //        type: 'important',
    //        startsAt: 'Sat Oct 10 2015 07:00 GMT+0800',
    //        endsAt: 'Sat Oct 10 2015 19:00 GMT+0800',
    //        recursOn: 'month',
    //        draggable: false,
    //        resizable: false
    //    }
    //];
    console.log(vm.events);
    $scope.vm = vm;
});
