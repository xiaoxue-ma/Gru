
sac.controller('ChatgroupCtrl', function ($scope, Chatgroup, $state,
                                          $localstorage, $ionicPopup) {

    $scope.serverPictureAddress = serverPictureAddress;
    $scope.serverIconAddress = serverIconAddress;

    function init(){
        $scope.groups = Chatgroup.list.query({user_id: $localstorage.get('user.user_id')});
        $scope.data = {};
    }

    init();

    $scope.addGroup = function (){
        $ionicPopup.show({
            template: '<input type="text" ng-model="data.groupName">',
            title: 'Enter Group Name',
            scope: $scope,
            buttons: [
                { text: 'Cancel' },
                {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        console.log($scope.data.groupName);
                        if (!$scope.data.groupName) {
                            e.preventDefault();
                        } else {
                            Chatgroup.list.save({
                                name: $scope.data.groupName,
                                user_id: $localstorage.get('user.user_id')
                            }, function(result){
                                if (result.status == 200){
                                    $state.go('single-page.manage-a-group', {groupId:result.message});
                                }
                            });
                        }
                    }
                }
            ]
        });
    };

    $scope.cancel = function(){
        $state.go('tab.chats');
    };

    $scope.quitGroup = function (index){
        $ionicPopup.confirm({
            title: 'Quit Group',
            template: 'Are you sure?'
        }).then(function(res) {
            if(res) {
                var data = {
                    group_id: $scope.groups[index].id,
                    user_id: $localstorage.get('user.user_id')
                };
                Chatgroup.member.delete(data, function (data) {
                    if (data.status == 200){
                        $scope.groups.splice(index, 1);
                    }
                });
            }
        });
    }
});


sac.controller('ChatgroupDetailCtrl', function ($scope, $stateParams, $localstorage,
                                                Chatgroup, $ionicPopup, $state, Friends) {
    $scope.serverPictureAddress = serverPictureAddress;
    $scope.serverIconAddress = serverIconAddress;
    function init(){
        $scope.group = Chatgroup.instance.get({group_id: $stateParams.groupId}, function (){
            $scope.members = $scope.group.members;
        });
    }

    init();

    $scope.addMember = function(){
        var data = {
            group_id: $stateParams.groupId,
            user_id: 2
        };
        console.log(data);
        Chatgroup.member.save(data, function(res){
            if (res.status == 200) {
                Friends.instance.get({
                    user_id1: $localstorage.get('user.user_id'),
                    user_id2: 2
                }, function (data){
                    $scope.members.push(data);
                })
            }
        })
    };

    $scope.removeMember = function(index){
        $ionicPopup.confirm({
            title: 'Remove member',
            template: 'This member will be removed from group.'
        }).then(function(res) {
            if(res) {
                var data = {
                    group_id: $stateParams.groupId,
                    user_id: $scope.members[index].ID
                };
                Chatgroup.member.delete(data, function (data) {
                    if (data.status == 200) {
                        $scope.members.splice(index, 1);
                    }
                });
            }
        });
    };

    $scope.cancel = function(){
        $state.go('tab.chats');
    };

    $scope.save = function (){
        Chatgroup.instance.update({
            group_id: $scope.group.id,
            name: $scope.group.name
        }, function(res){
            if (res.status == 200) {
                $state.go('tab.chats');
            }
        })
    }
});