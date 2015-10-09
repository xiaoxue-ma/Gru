sac.controller('InitCtrl', function ($scope, $state, $localstorage, $http) {
    $scope.register = function (user) {
        // send data to server, and get user_id
        var user_data = {
            name: user.name,
            phone_number: user.phone_number,
            password: user.password
        };

        $localstorage.set('user.phone_number', user.phone_number);
        $http.post(serverAddress + '/init/register', user_data)
            .success(function (data, status, headers, config) {
                if (data.status == 200) {
                    $localstorage.set('user.user_id', data.message);
                    $state.go('init.verify_phone_number');
                }
            })
            .error(function (data, status, header, config) {

            });
    };
    $scope.logIn = function (user) {
        var user_data = {
            phone_number: user.phone_number,
            password: user.password
        };
        $localstorage.set('user.phone_number', user.phone_number);
        $http.post(serverAddress + '/init/login', user_data)
            .success(function (data, status, headers, config) {
                if (data.status == 200) {
                    $localstorage.set('user.user_id', data.message);
                    $state.go('tab.family.social');
                }
            })
            .error(function (data, status, header, config) {

            });
    };
    $scope.verify = function (code) {
        var add = serverAddress + '/init/verify_code/' + $localstorage.get('user.user_id') + '/' + code;
        $http.get(add)
            .success(function (data, status, headers, config) {
                if (data.status == 200) {
                    $state.go('tab.family.social');
                }
            })
            .error(function (data, status, header, config) {

            });
    };

    $scope.send_code_again = function () {
        var add = serverAddress + '/init/send_code_again/' + $localstorage.get('user.user_id');
        $http.get(add)
            .success(function (data, status, headers, config) { })
            .error(function (data, status, header, config) { });
    }
});
