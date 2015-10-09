saService.factory('ChatSocket', function ($rootScope) {
    var socket = io.connect(serverAddress + '/chat');

    socket.on('server.system_message', function(msg){
        console.log(msg.data);
    });

    socket.on('server.message_reached', function(msg){
        console.log(msg.data);
        $rootScope.$broadcast('server.message_reached', msg);
    });

    socket.on('server.private_message', function (msg) {
        console.log('server.private_message ', msg.from, msg.data);
        $rootScope.$broadcast('server.private_message', msg);
    });

    socket.on('server.group_message', function (msg) {
        $rootScope.$broadcast('server.group_message', msg);
    });

    function establishChannel(user_id){
        socket.emit('conn.user_online', {
            user_id: user_id
        });
    }

    function sendPrivateMessage(data){
        socket.emit('client.private_message', data);
    }

    function sendGroupMessage(data){
        socket.emit('client.group_message', data);
    }

    return {
        socket: socket,
        establishChannel: establishChannel,
        sendPrivateMessage: sendPrivateMessage,
        sendGroupMessage: sendGroupMessage
    };
});