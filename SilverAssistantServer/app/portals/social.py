
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
        else:
            tags = ['']
        if app.config['QUESTION_SERVER_ENABLED']:
            import threading
            from app.intelligence import teachable_agent
            question_context = {
                'content': content,
                'tags': ' '.join(tags)
            }
            threading.Thread(target=teachable_agent.ask_question,
                             args=(question_context, s)).start()
        return response.response_ok(s.id)
    except Exception as e:
        return response.response_fail('Error posting status %s' % e)


@app.route('/status/<status_id>', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*', headers='Content-Type')
def status_element_get(status_id):
    pass


@app.route('/status/<status_id>', methods=['PUT', 'OPTIONS'])
@crossdomain(origin='*', headers='Content-Type')
def status_element_put(status_id):
    pass


@app.route('/status/<status_id>', methods=['DELETE', 'OPTIONS'])
@crossdomain(origin='*', headers='Content-Type')
def status_element_delete(status_id):
    pass
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


# <editor-fold desc="Comment on status">
@app.route('/comment', methods=['POST', 'OPTIONS'])
@crossdomain(origin='*', headers='Content-Type')
def comment_post():
    try:
        data = json.loads(request.stream.read())
        status_id = data['status_id']
        content = data['text_content']
        from_user_id = data['from_user_id']
        to_user_id = data.get('to_user_id', None)
        status = models.Status.query.get(int(status_id))
        if to_user_id is None:
            to_user_id = status.author.ID
        c = models.Comment(text_content=content, status_id=int(status_id),
                           sent_by_user_id=int(from_user_id), send_to_user_id=int(to_user_id))
        db.session.add(c)
        # clear teachable agent question if this is replying to teachable agent
        if int(to_user_id) == app.config['SILVER_ASSISTANT_SYSTEM_USER_ID'] \
                and status.ta_question_id is not None:
            requests.post(app.config['QUESTION_SERVER_ADDRESS'] + "/question_answered/" + status.ta_question_id)
            status.ta_question_id = None
        db.session.commit()
        return response.response_ok('Comment successful')
    except Exception as e:
        return response.response_fail('Error commenting on status %s' % e)
# </editor-fold>


@app.route('/topic_match/<user_id>', methods=['POST', 'OPTIONS'])
@crossdomain(origin='*', headers='Content-Type')
def topic_match(user_id):
    try:
        data = json.loads(request.stream.read())
        status = models.Status.query.filter(models.Status.user_id == int(user_id)).\
            order_by(models.Status.timestamp.desc()).first()
        post_data = {
            'status': status.as_dict(),
            'data': data
        }
        import requests
        r = requests.post(app.config['QUESTION_SERVER_ADDRESS'] + '/topic_match', data=json.dumps(post_data)).json()
        if r['status'] == 200:
            return response.response_ok(r['message'])
        else:
            return response.response_fail('Failure to get match at QuestionServer: ' + r['message'])
    except Exception as e:
        return response.response_fail('Exception at SA server get match %s' % e)


# not tested
@app.route('/like/comment/<comment_id>', methods=['GET', 'POST', 'OPTIONS'])
@crossdomain(origin='*', headers='Content-Type')
def like_comment(comment_id):
    try:
        from datetime import datetime
        r = models.CommentUserLikeAssociation(status_id=int(comment_id), user_id=int(user_id),
                                              timestamp=datetime.now().__str__())
        db.session.add(r)
        db.session.commit()
        return response.response_ok("Comment liked")
    except Exception as e:
        return response.response_fail("Like comment error %s" % e)