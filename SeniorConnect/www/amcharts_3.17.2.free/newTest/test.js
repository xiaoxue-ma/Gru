
sac.controller('AccountCtrl', function ($scope, $translate, OpenFB, FacebookToken,
                                        $localstorage, $ionicPopup, Friends) {
    function init(){
        $scope.translations = translations;
        $scope.currentLanguage = $translate.use();
        $scope.serverPictureAddress = serverPictureAddress;
        $scope.serverIconAddress = serverIconAddress;
        $scope.user = Friends.instance.get({user_id1: $localstorage.get('user.user_id'), user_id2: $localstorage.get('user.user_id')});
        FacebookToken.get({user_id: $localstorage.get('user.user_id')}, function(data){
            if (data.status == 200) {
                OpenFB.setToken(data.message);
                OpenFB.get('/me').success(function(user){
                    $scope.isFacebookConnected = user;
                });
            } else {
                $scope.isFacebookConnected = false;
            }
        });

    }

    init();
    $scope.data = generateChartData();


    $scope.setLanguage = function (currentLanguage){
        $translate.use(currentLanguage);
    };

    $scope.manageFacebookConnection = function () {
        console.log($scope.isFacebookConnected);
        if (!$scope.isFacebookConnected){
            connectToFacebook();
        } else {
            disconnectFacebook();
        }
    };

    function updateFacebookToken(){
        var token_data = {
            user_id: $localstorage.get('user.user_id'),
            fb_token: OpenFB.getToken()
        };
        FacebookToken.update(token_data);
    }

    function connectToFacebook(){
        OpenFB.login('email,read_stream,publish_stream').then(
            function () {
                OpenFB.get('/me').success(function (user) {
                    $scope.isFacebookConnected = user;
                    updateFacebookToken();
                    $ionicPopup.alert({
                        title: $translate.instant('account.facebook_connected')
                    });
                });
            }, function () {
                $ionicPopup.alert({
                    title: $translate.instant('facebook_failed')
                });
            });
    }

    function disconnectFacebook(){
        $ionicPopup.confirm({
            title: $translate.instant('account.facebook_disconnect'),
            template: $translate.instant('account.facebook_disconnect_body')
        }).then(function(res) {
            if(res) {
                OpenFB.setToken('');
                $scope.isFacebookConnected = false;
                updateFacebookToken();
            }
        });
    }

});

sac.directive('activityChart', function () {
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
                    "lineColor": "#2c63f0"
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
        link: function (scope, element, attrs, AccountCtrl) {
            // link function will generate the actual chart
            AmCharts.makeChart(element.get(0), AccountCtrl.configuration);
        }
    }
});
// generates some random data
function generateChartData() {
    var chartData = [];
    var firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 100);

    for (var i = 0; i < 100; i++) {
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
