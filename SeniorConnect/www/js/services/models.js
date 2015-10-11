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

saService.factory('Communitys',['$resource',
    function($resource){
        var communitys = [{
            id: 1,
            name: 'Tai Chi',
            img: 'Tai Ji.jpg',
            joined: true,
            read:false,
            events:[
                {
                    id:1,
                    name:'Tai Chi Quan Workshop',
                    img:'Tai Chi Quan.gif',
                    description:'Jennifer Chung is a Tai Chi trainer and Master Trainer',
                    joined:false,
                    date:'01 Nov 2015',
                    time:'6:30-7:30pm'
                },{
                    id:2,
                    name:'Tai Chi Quan Morning Exercise',
                    img:'tai chi exercise.jpg',
                    description:'Meet in Chinese Garden to do Tai Chi Quan as morning exercise together',
                    joined:false,
                    date:'Every day',
                    time:'6:00-7:00am'
                }
            ]
        }, {
            id: 2,
            name: 'Social Dance',
            img: 'social dance.jpg',
            joined:true,
            read:true,
            events:[
                {
                    id:1,
                    name:'Social Dance Workshop',
                    img:'social-dance-workshop.jpg',
                    description:'Anna Lee is a senior social dance trainer and Master Trainer',
                    joined:false,
                    date:'01 Nov 2015',
                    time:'6:30-7:30pm'
                },{
                    id:2,
                    name:'Evening Park Social Dance',
                    img:'social-dance-park.jpg',
                    description:'Meet in Chinese Garden to dance after dinner in the evening',
                    joined:false,
                    date:'Every day',
                    time:'7:00-8:00pm'
                }
            ]
        },{
            id: 3,
            name: 'Chess',
            img: 'chess.png',
            joined:false,
            read:true,
            events:[
                {
                    id:1,
                    name:'Annual Chess Competiton',
                    img:'chess-competition.jpg',
                    description:'The chess competition will have participants from the whole Singapore aged above 65',
                    joined:false,
                    date:'01 Nov 2015',
                    time:'6:30-7:30pm'
                },{
                    id:2,
                    name:'Chess and Chat',
                    img:'chess-in-park.jpg',
                    description:'Meet in Chinese Garden to play chess with other people and make friends',
                    joined:false,
                    date:'12 Nov 2015',
                    time:'9:00-11:00am'
                }
            ]
        }];

        return {
            query: function () {
                return communitys;
            },

            get: function (communityId) {
                for (var i = 0; i < communitys.length; i++) {
                    if (communitys[i].id === parseInt(communityId)) {
                        console.log(parseInt(communityId));
                        return communitys[i].events;
                    }
                }
            },
            update: function (communityID) {

            }
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
