
saService.factory('ChatData', ['$resource',
    function($resource){
        return {
            list: $resource(serverAddress + '/chats'),
            privateHistory: $resource(serverAddress + '/private_chat/:user_id1/:user_id2', {}, {
                setAsRead: {method: 'PUT', params: {user_id1: '@user_id1', user_id2: '@user_id2'}}
            }),
            groupHistory: $resource(serverAddress + '/group_chat/:group_id')
        }
    }
]);

saService.factory('Chatgroup', ['$resource',
    function($resource){
        return {
            list: $resource(serverAddress + '/chatgroup'),
            instance: $resource(serverAddress + '/chatgroup/:group_id', {}, {
                update: {method: 'PUT', params: {group_id: '@group_id'}}
            }),
            member: $resource(serverAddress + '/chatgroup_member/:group_id', {}, {
                save: {method: 'POST', params: {group_id: '@group_id'}}
            })
        }
    }
]);

saService.factory('Friends', ['$resource',
    function ($resource) {
        return {
            list: $resource(serverAddress + '/friend'),
            request: $resource(serverAddress + '/friend_request', {}, {
                accept: {method: 'PUT'}
            }),
            instance: $resource(serverAddress + '/friend/:user_id1/:user_id2',{}, {
                update: {method: 'PUT', params: {user_id1: '@user_id1', user_id2: '@user_id2'}},
                delete: {method: 'DELETE', params: {user_id1: '@user_id1', user_id2: '@user_id2'}}
            })
        };
    }
]);

saService.factory('Feeds', ['$resource',
    function($resource) {
        return $resource(serverAddress + '/feeds/:user_id');
    }
]);

saService.factory('Status', ['$resource',
    function ($resource) {
        return $resource(serverAddress + '/status')
    }
]);

saService.factory('Like', ['$resource',
    function ($resource) {
        return {
            status: $resource(serverAddress + '/like/status/:status_id', {}, {
                save: {method: 'POST', params: {status_id: ''}},
                dislike: {method: 'DELETE', params: {status_id: '@status_id'}}
            }),
            comment: $resource(serverAddress + '/like/comment')
        };
    }
]);

saService.factory('Comment', ['$resource',
    function ($resource) {
        return $resource(serverAddress + '/comment')
    }
]);

saService.factory('FacebookToken', ['$resource',
    function ($resource){
        return $resource(serverAddress + '/account/facebook/:user_id', {}, {
            get: {method: 'GET', params: {user_id: '@user_id'}},
            update: {method: 'PUT', params: {user_id: '@user_id'}}
        })
    }
]);
