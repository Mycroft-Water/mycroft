from flask import Flask, request, jsonify
import sys

from controller import Controller

app = Flask(__name__)

@app.route('/api/triggers', methods=['GET'])
def get_triggers():
    triggers = controller.get_triggers()
    response = {"triggers": triggers}
    return jsonify(response), '200 OK'

@app.route('/api/triggers/<name>', methods=['GET'])
def get_trigger_by_name(name):
    trigger, exception = controller.get_trigger_by_name(name)
    response = {'trigger': trigger}
    if exception:
        response['exception'] = exception
        return jsonify(response), '404 Not Found'
    return jsonify(response), '200 OK'

@app.route('/api/triggers/<name>', methods=['PUT'])
def set_trigger(name):
    new_data = request.get_json(force=True, silent=False)
    success, exception = controller.set_trigger(name, new_data)
    response = {'success': success}
    if exception:
        response['exception'] = exception
        return jsonify(response), '404 Not Found'
    return jsonify(response), '201 Created'

@app.route('/api/triggers', methods=['POST'])
def add_trigger():
    new_data = request.get_json(force=True, silent=False)
    success, exception = controller.add_trigger(new_data)
    response = {'success': success}
    if exception:
        response['exception'] = exception
        return jsonify(response), '404 Not Found'
    return jsonify(response), '201 Created'

@app.route('/api/triggers/<name>', methods=['DELETE'])
def delete_trigger(name):
    success, exception = controller.delete_trigger(name)
    response = {'success': success}
    if exception:
        response['exception'] = exception
        return jsonify(response), '404 Not Found'
    return jsonify(response), '201 Created'

@app.route('/api/operations', methods=['GET'])
def get_operations():
    operations = controller.get_operations()
    response = {"operations": operations}
    return jsonify(response), '200 OK'

@app.route('/api/operations/<name>', methods=['GET'])
def get_operation_by_name(name):
    operation, exception = controller.get_operation_by_name(name)
    response = {'operation': operation}
    if exception:
        response['exception'] = exception
        return jsonify(response), '404 Not Found'
    return jsonify(response), '200 OK'

@app.route('/api/operations/<name>', methods=['PUT'])
def set_operation(name):
    new_data = request.get_json(force=True, silent=False)
    success, exception = controller.set_operation(name, new_data)
    response = {'success': success}
    if exception:
        response['exception'] = exception
        return jsonify(response), '404 Not Found'
    return jsonify(response), '201 Created'

@app.route('/api/operations', methods=['POST'])
def add_operation():
    new_data = request.get_json(force=True, silent=False)
    success, exception = controller.add_operation(new_data)
    response = {'success': success}
    if exception:
        response['exception'] = exception
        return jsonify(response), '404 Not Found'
    return jsonify(response), '201 Created'

@app.route('/api/operations/<name>', methods=['DELETE'])
def delete_operation(name):
    success, exception = controller.delete_operation(name)
    response = {'success': success}
    if exception:
        response['exception'] = exception
        return jsonify(response), '404 Not Found'
    return jsonify(response), '201 Created'

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    tasks = controller.get_tasks()
    response = {"tasks": tasks}
    return jsonify(response), '200 OK'

@app.route('/api/tasks/<name>', methods=['GET'])
def get_task_by_name(name):
    task, exception = controller.get_task_by_name(name)
    response = {'task': task}
    if exception:
        response['exception'] = exception
        return jsonify(response), '404 Not Found'
    return jsonify(response), '200 OK'

@app.route('/api/tasks/<name>', methods=['PUT'])
def set_task(name):
    new_data = request.get_json(force=True, silent=False)
    success, exception = controller.set_task(name, new_data)
    response = {'success': success}
    if exception:
        response['exception'] = exception
        return jsonify(response), '404 Not Found'
    return jsonify(response), '201 Created'

@app.route('/api/tasks', methods=['POST'])
def add_task():
    new_data = request.get_json(force=True, silent=False)
    success, exception = controller.add_task(new_data)
    response = {'success': success}
    if exception:
        response['exception'] = exception
        return jsonify(response), '404 Not Found'
    return jsonify(response), '201 Created'

@app.route('/api/tasks/<name>', methods=['DELETE'])
def delete_task(name):
    success, exception = controller.delete_task(name)
    response = {'success': success}
    if exception:
        response['exception'] = exception
        return jsonify(response), '404 Not Found'
    return jsonify(response), '201 Created'


if __name__=='__main__':
    server_port = '3000'
    if len(sys.argv) > 1:
        server_port = sys.argv[1]
    controller = Controller()
    app.run(port=server_port)