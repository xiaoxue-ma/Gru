__author__ = 'Siyao'

import requests
from app import db, models, app
import json


def ask_question(question_context, status):
    r = requests.post(app.config['QUESTION_SERVER_ADDRESS'] + "/get_question", data=json.dumps(question_context))
    question = json.loads(r.text)
    status.ta_question_id = question['id']
    c = models.Comment(text_content=question['question'], status_id=int(status.id),
                       sent_by_user_id=app.config['SILVER_ASSISTANT_SYSTEM_USER_ID'],
                       send_to_user_id=int(status.user_id))
    db.session.add(c)
    db.session.commit()