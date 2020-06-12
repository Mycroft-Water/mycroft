from flask import Flask, request, jsonify
import sys

from controller import Controller

app = Flask('main_app')

@app.route('/api/triggers')
def get_triggers():
    response = jsonify()


if __name__=='__main__':
    server_port = '3000'
    if len(sys.argv) > 1:
        server_port = sys.argv[1]
    controller = Controller()
    app.run(port=server_port)