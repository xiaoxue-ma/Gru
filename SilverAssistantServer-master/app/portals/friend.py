__author__ = 'Siyao'

from portal_base import *
from app import app

# <editor-fold desc="Friends">
@app.route('/friend', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*', headers='Content-Type')
def friends_get():
    user_id = request.args.get('user_id', None)
    user = models.User.query.get(int(user_id))
    all_friends = user.friends.all()
    for friend in all_friends:
        friend.fetch_relationship_detail(user)
    js = json.dumps([i.as_dict() for i in all_friends if i.status == 'confirmed'])
    return js

@app.route('/friend/<user_id1>/<user_id2>', methods=['DELETE', 'OPTIONS'])
@crossdomain(origin='*')
def delete_friend(user_id1, user_id2):
    try:
        r1 = models.UserUserAssociation.query.filter_by(user_id1=int(user_id1), user_id2=int(user_id2)).first()
        r2 = models.UserUserAssociation.query.filter_by(user_id1=int(user_id2), user_id2=int(user_id1)).first()
        db.session.delete(r1)
        db.session.delete(r2)
        db.session.commit()
        return response.response_ok()
    except Exception as e:
        return response.response_fail('Error deleting friends %s' % e)
# </editor-fold>


# <editor-fold desc="Friend Requests">
@app.route('/friend_request', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*', headers='Content-Type')
def get_friend_requests():
    user_id = request.args.get('user_id', None)
    user = models.User.query.get(int(user_id))
    all_friends = user.friends.all()
    for friend in all_friends:
        friend.fetch_relationship_detail(user)
    js = json.dumps([i.as_dict() for i in all_friends if i.status == 'pending'])
    return js


@app.route('/friend_request', methods=['POST', 'OPTIONS'])
@crossdomain(origin='*', headers='Content-Type')
def add_friend_request():
    try:
        data = json.loads(request.stream.read())
        user_id1 = data['user_id1']
        target_phone_number = data['target_phone_number']
        user1 = models.User.query.get(int(user_id1))
        user2 = models.User.query.filter_by(phone_number=int(target_phone_number)).first()
        if user2 is None:
            return response.response_fail("User not found")
        r1 = models.UserUserAssociation(user_id1=user1.ID, user_id2=user2.ID, status='waiting')
        r2 = models.UserUserAssociation(user_id1=user2.ID, user_id2=user1.ID)
        db.session.add(r1)
        db.session.add(r2)
        db.session.commit()
        return response.response_ok()
    except Exception as e:
        return response.response_fail('Error adding friends %s' % e)


@app.route('/friend_request', methods=['PUT', 'OPTIONS'])
@crossdomain(origin='*', headers='Content-Type')
def accept_request():
    try:
        data = json.loads(request.stream.read())
        user_id1 = data['user_id1']
        user_id2 = data['user_id2']
        r1 = models.UserUserAssociation.query.filter_by(user_id1=int(user_id1), user_id2=int(user_id2)).first()
        r2 = models.UserUserAssociation.query.filter_by(user_id1=int(user_id2), user_id2=int(user_id1)).first()
        r1.status = 'confirmed'
        r2.status = 'confirmed'
        db.session.commit()
        return response.response_ok()
    except Exception as e:
        return response.response_fail('Error confirm friends %s' % e)

# </editor-fold>