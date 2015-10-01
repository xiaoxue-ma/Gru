__author__ = 'Siyao'

from portal_base import *
from app import socketio, app
from flask.ext.socketio import emit, join_room

room_prefix = app.config['ROOM_PREFIX']


@socketio.on('connect', namespace='/chat')
def chat_connect():
    emit('server.system_message', {'data': 'Connected'})


@socketio.on('disconnect', namespace='/chat')
def chat_disconnect():
    print('Client disconnected')


@socketio.on('conn.user_online', namespace='/chat')
def join(message):
    join_room(room_prefix + message['user_id'])
    emit('server.system_message', {'data': 'Room Channel established for ' + message['user_id']})


@socketio.on('client.private_message', namespace='/chat')
def handle_private_message(message):
    handle_message(message, is_group=False)


@socketio.on('client.group_message', namespace='/chat')
def handle_group_message(message):
    handle_message(message, is_group=True)


@socketio.on('client.broadcast_event', namespace='/chat')
def chat_broadcast(message):
    emit('server.broadcast_event', {'data': message['data']}, broadcast=True)


def handle_message(message, is_group=False):
    type = 'text' if message['type'] is None else message['type']
    from_user = message['from']
    data = message['data']
    msg = {
        'from': from_user,
        'data': data,
        'type': type
    }
    if is_group:
        msg['to_group'] = message['to']
        to_group = message['to'][1::]
        target_group = models.Chatgroup.query.get(int(to_group))
        m = models.GroupChatMessage(from_user_id=from_user, to_group_id=to_group,
                                    text_content=data, type=type)
        db.session.add(m)
        db.session.commit()

        # forward message to users in the group
        users_in_group = target_group.all_users_in_group
        # Acknowledgement
        emit('server.message_reached', {'local_identifier': message['local_identifier'],
                                        'message_id': 'g' + str(m.id),
                                        'type': type})
        for user in users_in_group:
            if user.ID != int(from_user):
                emit('server.group_message', msg, room=room_prefix + str(user.ID))
    else:
        to_user = message['to']
        m = models.ChatMessage(from_user_id=from_user, to_user_id=to_user,
                               text_content=data, type=type)
        db.session.add(m)
        db.session.commit()

        # Acknowledgement
        emit('server.message_reached', {'local_identifier': message['local_identifier'],
                                        'message_id': m.id,
                                        'type': type})
        # forward the message to user
        msg['id'] = m.id
        emit('server.private_message', msg, room=room_prefix + to_user)
