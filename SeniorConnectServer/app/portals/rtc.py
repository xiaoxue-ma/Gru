__author__ = 'Xiaoxue'

from app import socketio, app
from flask.ext.socketio import emit, join_room

room_prefix = app.config['RTC_ROOM_PREFIX']


@socketio.on('connect', namespace='/rtc')
def rtc_connect():
    emit('server.system_message', {'data': 'RTC Connected'})


@socketio.on('disconnect', namespace='/rtc')
def rtc_disconnect():
    print('Client disconnected')


@socketio.on('conn.user_online', namespace='/rtc')
def rtc_join(message):
    join_room(room_prefix + message['user_id'])
    emit('server.system_message', {'data': 'RTC Channel established for ' + message['user_id']})


@socketio.on('sendMessage', namespace='/rtc')
def rtc_relay(message):
    target = message['to']
    emit('messageReceived', message, room=room_prefix+target)
