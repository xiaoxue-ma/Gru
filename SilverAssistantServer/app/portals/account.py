

from portal_base import *
from app import app


@app.route('/account/facebook/<user_id>', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*', headers='Content-Type')
def get_facebook_token(user_id):
    try:
        user = models.User.query.get(int(user_id))
        if user.fb_token is not None and user.fb_token != '':
            return response.response_ok(user.fb_token)
        else:
            return response.response_fail('Current user has no facebook token')
    except Exception as e:
        return response.response_fail('Error getting facebook token %s' % e)


@app.route('/account/facebook/<user_id>', methods=['PUT', 'OPTIONS'])
@crossdomain(origin='*', headers='Content-Type')
def set_facebook_token(user_id):
    try:
        data = json.loads(request.stream.read())
        user = models.User.query.get(int(user_id))
        user.fb_token = data['fb_token']
        db.session.commit()
        return response.response_ok()
    except Exception as e:
        return response.response_fail('Error setting facebook token %s' % e)