__author__ = 'Xiaoxue'

from portal_base import *
from app import app


# <editor-fold desc="Feeds">
@app.route('/feeds/<user_id>', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def get_feeds(user_id):
    user = models.User.query.get(int(user_id))
    friends = user.friends.all()
    id_list = [friend.ID for friend in friends]
    id_list.append(user_id)
    s = models.Status.query.filter(models.Status.user_id.in_(id_list))\
        .order_by(models.Status.id.desc()).limit(30).all()
    js = json.dumps([i.as_dict() for i in s])
    return js
# </editor-fold>


# <editor-fold desc="Status">
@app.route('/status', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*', headers='Content-Type')
def get_status():
    user_id = request.args.get('user_id', None)
    user = models.User.query.get(int(user_id))
    s = user.statuses.order_by(models.Status.id.desc()).limit(10).all()
    js = json.dumps([i.as_dict() for i in s])
    return js


@app.route('/status', methods=['POST', 'OPTIONS'])
@crossdomain(origin='*', headers='Content-Type')
def post_status():
    try:
        data = json.loads(request.stream.read())
        user_id = data['user_id']
        content = data.get('text_content', None)
        tags = data.get('tags', None)
        location = data.get('location', None)
        from datetime import datetime
        event_timestamp = data.get('event_timestamp', datetime.now().__str__())
        s = models.Status(text_content=content, user_id=int(user_id),
                          location=location, event_timestamp=event_timestamp)
        db.session.add(s)
        db.session.commit()
        if tags is not None:
            tags = tags.split(',')
            for tag in tags:
                t = models.Tag.query.filter_by(text_content=tag).first()
                if t is None:
                    t = models.Tag(text_content=tag)
                    db.session.add(t)
                    db.session.commit()
                st1 = models.StatusTagAssociation(status_id=s.id, tag_id=t.id, tagged_by_user=user_id)
                db.session.add(st1)
            db.session.commit()
        return response.response_ok(s.id)
    except Exception as e:
        return response.response_fail('Error posting status %s' % e)

# </editor-fold>


# <editor-fold desc="Like status">
@app.route('/like/status', methods=['POST', 'OPTIONS'])
@crossdomain(origin='*', headers='Content-Type')
def like_status_post():
    try:
        data = json.loads(request.stream.read())
        status_id = data['status_id']
        user_id = data.get('user_id', None)
        from datetime import datetime
        r = models.StatusUserLikeAssociation(status_id=int(status_id), user_id=int(user_id),
                                             timestamp=datetime.now().__str__())
        db.session.add(r)
        db.session.commit()
        return response.response_ok("Status liked")
    except Exception as e:
        return response.response_fail("Like status error %s" % e)


@app.route('/like/status/<status_id>', methods=['DELETE', 'OPTIONS'])
@crossdomain(origin='*', headers='Content-Type')
def dislike_status(status_id):
    try:
        user_id = request.args.get('user_id', None)
        from datetime import datetime
        r = models.StatusUserLikeAssociation.query.filter_by(
            status_id=int(status_id), user_id=int(user_id)).first()
        db.session.delete(r)
        db.session.commit()
        return response.response_ok("Status disliked")
    except Exception as e:
        return response.response_fail("Dislike status error %s" % e)
# </editor-fold>
