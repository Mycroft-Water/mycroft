from flask import Flask, request, jsonify
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
import sys
import secrets

from .controller import Controller

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = secrets.token_hex(64)
#app.config['JWT_SECRET_KEY'] = '1F47888E377B236CDED0F48F57F42F529E28101C24D2D8D8449C996904E26A86'
jwt = JWTManager(app)

@app.route('/api/register', methods=['POST'])
def register():
    new_user = request.get_json(force=True, silent=False)
    success, exception = controller.add_user(new_user)
    response = {'success': success}
    if exception:
        response['exception'] = exception
        return jsonify(response), '409 Conflict'
    return jsonify(response), '201 Created'

@app.route('/api/login', methods=['POST'])
def login():
    user_info = request.get_json(force=True, silent=False)
    success, exception = controller.validate_user(user_info)
    response = {'success': success}
    if exception:
        response['exception'] = exception
        return jsonify(response), '401 Unauthorized'
    access_token = create_access_token(identity=user_info['username'])
    response['access_token'] = access_token
    return jsonify(response), '200 OK'

@app.route('/api/triggers', methods=['GET'])
@jwt_required
def get_triggers():
    cur_user = get_jwt_identity()
    triggers = controller.get_triggers(cur_user)
    response = {"triggers": triggers}
    return jsonify(response), '200 OK'

@app.route('/api/triggers/<name>', methods=['GET'])
@jwt_required
def get_trigger_by_name(name):
    cur_user = get_jwt_identity()
    trigger, exception = controller.get_trigger_by_name(name, cur_user)
    response = {'trigger': trigger}
    if exception:
        response['exception'] = exception
        return jsonify(response), '404 Not Found'
    return jsonify(response), '200 OK'

@app.route('/api/triggers/<name>', methods=['PUT'])
@jwt_required
def set_trigger(name):
    cur_user = get_jwt_identity()
    new_data = request.get_json(force=True, silent=False)
    success, exception = controller.set_trigger(name, cur_user, new_data)
    response = {'success': success}
    if exception:
        response['exception'] = exception
        return jsonify(response), '404 Not Found'
    return jsonify(response), '201 Created'

@app.route('/api/triggers', methods=['POST'])
@jwt_required
def add_trigger():
    cur_user = get_jwt_identity()
    new_data = request.get_json(force=True, silent=False)
    new_data['username'] = cur_user
    success, exception = controller.add_trigger(new_data)
    response = {'success': success}
    if exception:
        response['exception'] = exception
        return jsonify(response), '404 Not Found'
    return jsonify(response), '201 Created'

@app.route('/api/triggers/<name>', methods=['DELETE'])
@jwt_required
def delete_trigger(name):
    cur_user = get_jwt_identity()
    success, exception = controller.delete_trigger(name, cur_user)
    response = {'success': success}
    if exception:
        response['exception'] = exception
        return jsonify(response), '404 Not Found'
    return jsonify(response), '201 Created'

@app.route('/api/operations', methods=['GET'])
@jwt_required
def get_operations():
    cur_user = get_jwt_identity()
    operations = controller.get_operations(cur_user)
    response = {"operations": operations}
    return jsonify(response), '200 OK'

@app.route('/api/operations/<name>', methods=['GET'])
@jwt_required
def get_operation_by_name(name):
    cur_user = get_jwt_identity()
    operation, exception = controller.get_operation_by_name(name, cur_user)
    response = {'operation': operation}
    if exception:
        response['exception'] = exception
        return jsonify(response), '404 Not Found'
    return jsonify(response), '200 OK'

@app.route('/api/operations/<name>', methods=['PUT'])
@jwt_required
def set_operation(name):
    cur_user = get_jwt_identity()
    new_data = request.get_json(force=True, silent=False)
    success, exception = controller.set_operation(name, cur_user, new_data)
    response = {'success': success}
    if exception:
        response['exception'] = exception
        return jsonify(response), '404 Not Found'
    return jsonify(response), '201 Created'

@app.route('/api/operations', methods=['POST'])
@jwt_required
def add_operation():
    cur_user = get_jwt_identity()
    new_data = request.get_json(force=True, silent=False)
    new_data['username'] = cur_user
    success, exception = controller.add_operation(new_data)
    response = {'success': success}
    if exception:
        response['exception'] = exception
        return jsonify(response), '404 Not Found'
    return jsonify(response), '201 Created'

@app.route('/api/operations/<name>', methods=['DELETE'])
@jwt_required
def delete_operation(name):
    cur_user = get_jwt_identity()
    success, exception = controller.delete_operation(name, cur_user)
    response = {'success': success}
    if exception:
        response['exception'] = exception
        return jsonify(response), '404 Not Found'
    return jsonify(response), '201 Created'

@app.route('/api/tasks', methods=['GET'])
@jwt_required
def get_tasks():
    cur_user = get_jwt_identity()
    tasks = controller.get_tasks(cur_user)
    response = {"tasks": tasks}
    return jsonify(response), '200 OK'

@app.route('/api/tasks/<name>', methods=['GET'])
@jwt_required
def get_task_by_name(name):
    cur_user = get_jwt_identity()
    task, exception = controller.get_task_by_name(name, cur_user)
    response = {'task': task}
    if exception:
        response['exception'] = exception
        return jsonify(response), '404 Not Found'
    return jsonify(response), '200 OK'

@app.route('/api/tasks/<name>', methods=['PUT'])
@jwt_required
def set_task(name):
    cur_user = get_jwt_identity()
    new_data = request.get_json(force=True, silent=False)
    success, exception = controller.set_task(name, cur_user, new_data)
    response = {'success': success}
    if exception:
        response['exception'] = exception
        return jsonify(response), '404 Not Found'
    return jsonify(response), '201 Created'

@app.route('/api/tasks', methods=['POST'])
@jwt_required
def add_task():
    cur_user = get_jwt_identity()
    new_data = request.get_json(force=True, silent=False)
    new_data['username'] = cur_user
    success, exception = controller.add_task(new_data)
    response = {'success': success}
    if exception:
        response['exception'] = exception
        return jsonify(response), '404 Not Found'
    return jsonify(response), '201 Created'

@app.route('/api/tasks/<name>', methods=['DELETE'])
@jwt_required
def delete_task(name):
    cur_user = get_jwt_identity()
    success, exception = controller.delete_task(name, cur_user)
    response = {'success': success}
    if exception:
        response['exception'] = exception
        return jsonify(response), '404 Not Found'
    return jsonify(response), '201 Created'

def init(server_port: str):
    controller = Controller()
    app.run(port=server_port)

if __name__=='__main__':
    server_port = '8080'
    if len(sys.argv) > 1:
        server_port = sys.argv[1]
    init(server_port)