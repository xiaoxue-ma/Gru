
from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.socketio import SocketIO


app = Flask(__name__, static_url_path='')
app.config.from_object('config')
app.debug = True
db = SQLAlchemy(app)
dec_base = db.make_declarative_base()
dec_base.metadata.reflect(db.engine)

socketio = SocketIO(app)


from app.portals import account, chat, friend, init, resource, social, messaging
