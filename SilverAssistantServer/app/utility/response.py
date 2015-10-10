

from flask import jsonify


def response_fail(message='', code=500):
    return jsonify({
        "status": code,
        "message": message
    })


def response_ok(message=''):
    return jsonify({
        "status": 200,
        "message": message
    })