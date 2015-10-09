
from portal_base import *
from app import app, socketio
from sqlalchemy import or_, and_
from datetime import datetime, timedelta


# <editor-fold desc="Triggers for Socket Testing">
@app.route('/test')
def test_send_message():
    # test purpose!!!!
    msg = {
        'from': 2,
        'data': 'oh1111',
        'name': 'Ailiya'
    }
    socketio.emit('server.private_message', msg, namespace='/chat')
    return response.response_ok()


@app.route('/testg')
def testg_send_message():
    # test purpose!!!!
    msg = {
        'from': 2,
        'to_group': 'g1',
        'data': 'testg',
        'name': 'ng'
    }
    socketio.emit('server.group_message', msg, namespace='/chat')
    return response.response_ok()
# </editor-fold>


# <editor-fold desc="Read Chat List and History">
@app.route('/chats', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*', headers='Content-Type')
def get_chats():
    user_id = request.args.get('user_id', None)
    me = models.User.query.get(int(user_id))
    since = datetime.now() - timedelta(hours=240)
    messages = models.ChatMessage.query.filter(or_(
        models.ChatMessage.from_user_id == int(user_id),
        models.ChatMessage.to_user_id == int(user_id)
    )).filter(or_(
        models.ChatMessage.timestamp > since,
        and_(models.ChatMessage.status == 'unread',
             models.ChatMessage.to_user_id == int(user_id))
    )).all()
    users = set()
    for m in messages:
        users.add(m.from_user_id)
        users.add(m.to_user_id)
    users = list(users)
    user_last_msg_list = []
    for user in users:
        msg = models.ChatMessage.query.filter(
            or_(
                and_(models.ChatMessage.from_user_id == int(user_id),
                     models.ChatMessage.to_user_id == int(user)),
                and_(models.ChatMessage.to_user_id == int(user_id),
                     models.ChatMessage.from_user_id == int(user))
            )).order_by(models.ChatMessage.timestamp.desc()).limit(1).all()
        if msg:
            u = models.User.query.get(int(user))
            u.fetch_relationship_detail(me)
            user_last_msg_list.append({
                'lastText': msg[0].text_content,
                'name': u.name,
                'id': u.ID,
                'icon': u.icon,
                'unread_count': sum(1 for m in messages if m.from_user_id == user and m.status == 'unread')
            })

    # group section
    groups = me.all_groups_user_in
    for group in groups:
        msg = models.GroupChatMessage.query.filter_by(to_group_id=group.id).\
            order_by(models.GroupChatMessage.timestamp.desc()).limit(1).all()
        user_last_msg_list.append({
            'lastText': msg[0].text_content if msg else None,
            'name': group.name,
            'id': 'g' + str(group.id),
            'icon': app.config['GROUP_ICON_PATH'],
            'unread_count': 0
        })

    js = json.dumps(user_last_msg_list)
    return js


@app.route('/private_chat/<user_id1>/<user_id2>', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*', headers='Content-Type')
def get_private_chat_history(user_id1, user_id2):
    offset = request.args.get("offset") or 0
    limit = request.args.get('limit') or app.config['NUMBER_OF_MESSAGES_PER_LOAD']

    messages = models.ChatMessage.query.filter(
        or_(
            and_(models.ChatMessage.from_user_id == int(user_id1),
                 models.ChatMessage.to_user_id == int(user_id2)),
            and_(models.ChatMessage.to_user_id == int(user_id1),
                 models.ChatMessage.from_user_id == int(user_id2))
        )).order_by(models.ChatMessage.timestamp.desc()).limit(limit).offset(offset).all()
    # desc to get latest messages, reverse list for display
    js = json.dumps([i.as_dict() for i in messages][::-1])
    return js


@app.route('/private_chat/<user_id1>/<user_id2>', methods=['PUT', 'OPTIONS'])
@crossdomain(origin='*', headers='Content-Type')
def set_all_private_chat_message_as_read(user_id1, user_id2):
    messages = models.ChatMessage.query.filter(
        and_(models.ChatMessage.from_user_id == int(user_id2),
             models.ChatMessage.to_user_id == int(user_id1),
             models.ChatMessage.status == 'unread')
    ).all()
    for m in messages:
        m.status = 'read'
    db.session.commit()
    return response.response_ok()


@app.route('/group_chat/<group_id>', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*', headers='Content-Type')
def get_group_chat_history(group_id):
    offset = request.args.get("offset") or 0
    limit = request.args.get('limit') or app.config['NUMBER_OF_MESSAGES_PER_LOAD']
    messages = models.GroupChatMessage.query.filter_by(to_group_id=int(group_id))\
        .order_by(models.GroupChatMessage.timestamp.desc()).limit(limit).offset(offset).all()
    # desc to get latest messages, reverse list for display
    js = json.dumps([i.as_dict() for i in messages][::-1])
    return js
# </editor-fold>


# <editor-fold desc="Chatgroup Management">
@app.route('/chatgroup', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*', headers='Content-Type')
def get_all_chatgroups_of_user():
    user_id = request.args.get('user_id', None)
    u = models.User.query.get(int(user_id))
    groups = u.all_groups_user_in
    dictionary = [i.as_dict() for i in groups]
    for i in dictionary:
        i['icon'] = app.config['GROUP_ICON_PATH']
    return json.dumps(dictionary)


@app.route('/chatgroup', methods=['POST', 'OPTIONS'])
@crossdomain(origin='*', headers='Content-Type')
def create_chatgroup():
    try:
        data = json.loads(requst.stream.read())
        name = data['name']
        user_id = data['user_id']
        group = models.Chatgroup(name=name)
        db.session.add(group)
        db.session.commit()
        uc = models.UserChatgroupAssociation(user_id=int(user_id), chatgroup_id=group.id)
        db.session.add(uc)
        db.session.commit()
        return response.response_ok(message=str(group.id))
    except Exception as e:
        return response.response_fail('Error creating new chatgroup %s' % e)


@app.route('/chatgroup/<group_id>', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*', headers='Content-Type')
def get_chatgroup_details(group_id):
    group = models.Chatgroup.query.get(int(group_id))
    d = group.as_dict()
    users = group.all_users_in_group
    d['members'] = [i.as_dict() for i in users]
    return json.dumps(d)


@app.route('/chatgroup/<group_id>', methods=['PUT', 'OPTIONS'])
@crossdomain(origin='*', headers='Content-Type')
def update_chatgroup_details(group_id):
    try:
        data = json.loads(request.stream.read())
        group = models.Chatgroup.query.get(int(group_id))
        group.name = data['name']
        db.session.commit()
        return response.response_ok()
    except Exception as e:
        return response.response_fail('Error updating chatgroup %s' % e)


@app.route('/chatgroup_member/<group_id>', methods=['POST', 'OPTIONS'])
@crossdomain(origin='*', headers='Content-Type')
def add_user_to_chatgroup(group_id):
    try:
        data = json.loads(request.stream.read())
        user_id = data['user_id']
        uc = models.UserChatgroupAssociation(user_id=int(user_id),
                                             chatgroup_id=int(group_id))
        db.session.add(uc)
        db.session.commit()
        return response.response_ok()
    except Exception as e:
        return response.response_fail('Error adding member into chatgroup %s' % e)


@app.route('/chatgroup_member/<group_id>', methods=['DELETE', 'OPTIONS'])
@crossdomain(origin='*', headers='Content-Type')
def remove_user_from_chatgroup(group_id):
    try:
        user_id = request.args.get('user_id')
        uc = models.UserChatgroupAssociation.query.filter_by(user_id=int(user_id),
                                                             chatgroup_id=int(group_id)).first()
        db.session.delete(uc)
        db.session.commit()
        return response.response_ok()
    except Exception as e:
        return response.response_fail('Error removing member from chatgroup %s' % e)
# </editor-fold>
