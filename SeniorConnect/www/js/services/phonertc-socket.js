
saService.factory('RtcSocket', function () {
    var socket = io.connect(serverAddress + '/rtc');

    socket.on('server.system_message', function(msg){
        console.log(msg.data);
    });

    function establishChannel(user_id){
        socket.emit('conn.user_online', {
            user_id: user_id
        });
    }

    function sendMessage(from, to, data){
        data.from = from;
        data.to = to;
        socket.emit('sendMessage', data);
    }

    return {
        socket: socket,
        establishChannel: establishChannel,
        sendMessage: sendMessage
    };
});
