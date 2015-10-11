__author__ = 'Xiaoxue'

from app import app


def is_extension_allowed(filename, file_type):
    config_name = 'ALLOWED_' + file_type.upper() + '_EXTENSIONS'
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in app.config[config_name]

