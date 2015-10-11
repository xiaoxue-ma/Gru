__author__ = 'Xiaoxue'

def convert_to_string(value):
    try:
        return str(value)
    except UnicodeEncodeError:
        return value.encode('utf-8')