__author__ = 'Xiaoxue'

SQLALCHEMY_DATABASE_URI = 'mysql://silverassistant:silverassistant@127.0.0.1/silverassistant'

UPLOAD_FOLDER_PIC = '/app/static/pic/'
UPLOAD_FOLDER_AUDIO = '/app/static/audio/'
UPLOAD_FOLDER_VIDEO = '/app/static/video/'
UPLOAD_FOLDER_ICON = '/app/static/icon/'
ALLOWED_PIC_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
ALLOWED_ICON_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
ALLOWED_AUDIO_EXTENSIONS = {'amr', 'wav', 'mp3'}


SYSTEM_USER_ID = 11
SYSTEM_USER_PHONE_NUMBER = 0

GROUP_ICON_PATH = 'group.jpg'
NUMBER_OF_MESSAGES_PER_LOAD = 20

# Key for chatting
SECRET_KEY = 'gjr39dkjn344_!67#'
ROOM_PREFIX = 'user.'
RTC_ROOM_PREFIX = 'rtc.'