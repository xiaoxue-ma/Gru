from portal_base import *
from app import app

from hashlib import sha256
from datetime import datetime


@app.route('/init/register', methods=['GET', 'POST', 'OPTIONS'])
@crossdomain(origin='*', headers='Content-Type')
def get_verification_code():

    data = json.loads(request.stream.read())
    user = models.User.load_from_json(data)
    try:
        db.session.add(user)
        db.session.commit()
    except Exception as e:
        return response.response_fail('Add new user error: %s' % e)

    try:
        user.verification_code = sha256(user.phone_number.__repr__()
                                   + datetime.now().__repr__()
                                   + user.password).hexdigest()[0:6]
        print user.verification_code
        db.session.commit()
        sms_sender.send(user.phone_number, user.verification_code)
    except Exception as e:
        return response.response_fail('Failed to send message %s' % e)

    return response.response_ok(user.ID)


@app.route('/init/verify_code/<user_id>/<code>', methods=['GET', 'POST', 'OPTIONS'])
@crossdomain(origin='*')
def verify_code(user_id, code):
    try:
        user = models.User.query.get(user_id)
        if user.verification_code == str(code):
            user.verification_status = 'verified'
            # Add System As Friend!
            r1 = models.UserUserAssociation(user_id1=user.ID, user_id2=app.config['SYSTEM_USER_ID'], status='confirmed')
            r2 = models.UserUserAssociation(user_id2=user.ID, user_id1=app.config['SYSTEM_USER_ID'], status='confirmed')
            db.session.add(r1)
            db.session.add(r2)
            db.session.commit()
            return response.response_ok()
        else:
            return response.response_fail('wrong code')
    except Exception as e:
        return response.response_fail('Server Error %s' % e)


@app.route('/init/login', methods=['GET', 'POST', 'OPTIONS'])
@crossdomain(origin='*', headers='Content-Type')
def login():
    data = json.loads(request.stream.read())
    phone_number = data['phone_number']
    password = data['password']
    user = models.User.query.filter_by(phone_number=phone_number, password=password).first()
    if user is None:
        return response.response_fail('wrong credentials')
    elif user.verification_status != 'verified':
        return response.response_fail('user not verified', code=100)
    else:
        return response.response_ok(user.ID)


@app.route('/init/send_code_again/<user_id>', methods=['GET', 'POST', 'OPTIONS'])
@crossdomain(origin='*', headers='Content-Type')
def send_code_again(user_id):
    user = models.User.query.get(user_id)
    sms_sender.send(user.phone_number, user.verification_code)
    return response.response_ok('code resent')