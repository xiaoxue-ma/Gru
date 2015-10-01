__author__ = 'Siyao'

def convert_to_string(value):
    try:
        return str(value)
    except UnicodeEncodeError:
        return value.encode('utf-8')