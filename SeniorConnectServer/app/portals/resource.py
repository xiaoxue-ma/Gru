__author__ = 'Xiaoxue'

from portal_base import *
from app import app
from app.utility.resource import is_extension_allowed


@app.route('/<resource>/<filename>', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def send_resource(resource, filename):
    return app.send_static_file(resource + '/' + filename)


@app.route('/pic/<status_id>/<index>', methods=['POST', 'OPTIONS'])
@crossdomain(origin='*', headers='Content-Type')
def upload_pic(status_id, index):
    try:
        file = request.files['file']
        if file and is_extension_allowed(file.filename, 'pic'):
            target_filename = status_id + '_' + index + '.' + file.filename.rsplit('.', 1)[1]
            import os
            path = os.path.realpath('.') + os.path.join(app.config['UPLOAD_FOLDER_PIC'], target_filename)
            file.save(path)
            p = models.Picture(content=target_filename, status_id=status_id)
            db.session.add(p)
            db.session.commit()
            return response.response_ok('Upload file successful')
        else:
            return response.response_fail('Error uploading file: file type not allowed')
    except Exception as e:
        return response.response_fail('Error uploading file %s' % e)


@app.route('/chat_image/<message_id>', methods=['POST', 'OPTIONS'])
@crossdomain(origin='*', headers='Content-Type')
def upload_chat_image(message_id):
    try:
        file = request.files['file']
        # if file and is_extension_allowed(file.filename, 'pic'):
        # target_filename = message_id + '.' + file.filename.rsplit('.', 1)[1]
        target_filename = message_id + '.jpg'
        import os
        path = os.path.realpath('.') + os.path.join(app.config['UPLOAD_FOLDER_CHAT_IMAGE'], target_filename)
        file.save(path)
        m = models.ChatMessage.query.get(message_id)
        m.image_content = target_filename
        db.session.commit()
        return response.response_ok('Upload file successful')
        # else:
        #     return response.response_fail('Error uploading file: file type not allowed')
    except Exception as e:
        return response.response_fail('Error uploading file %s' % e)


@app.route('/audio/<message_id>', methods=['POST', 'OPTIONS'])
@crossdomain(origin='*', headers='Content-Type')
def upload_audio(message_id):
    try:
        file = request.files['file']
        if file and is_extension_allowed(file.filename, 'audio'):
            target_filename = message_id + '.' + file.filename.rsplit('.', 1)[1]
            import os
            path = os.path.realpath('.') + os.path.join(app.config['UPLOAD_FOLDER_AUDIO'], target_filename)
            print path
            file.save(path)

            if str(message_id)[0] == 'g':
                m = models.GroupChatMessage.query.get(message_id[1::])
            else:
                m = models.ChatMessage.query.get(message_id)
            m.audio_content = target_filename
            db.session.commit()
            return response.response_ok('Upload file successful')
        else:
            return response.response_fail('Error uploading file: file type not allowed')
    except Exception as e:
        print e
        return response.response_fail('Error uploading file %s' % e)
