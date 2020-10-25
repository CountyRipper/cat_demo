import serial
import time
from flask import Flask, jsonify, request
from random import randint
app = Flask(__name__)

prev = 0

@app.before_first_request
def _declareStuff():
    global serial
    serial = serial.Serial('/dev/ttyACM1',9600,timeout=1)

@app.route('/hello')
def hello_again():
    return 'Hello, Again!'

@app.route('/getinfo', methods=['GET', 'POST'])
def get_weight():
    global prev
    time.sleep(0.1)
    response = serial.readline().decode('utf-8').rstrip()[:-3]
    serial.flushInput()
    if not response:
        response = prev
    else:
        prev = response
    return jsonify({
        'weight': response,
        'odor': randint(30, 35),
    })

@app.route('/setdirection', methods=['POST'])
def setdirection():
    dirction = request.form['director']
    if dirction:
        serial.write(dirction.rstrip().encode())
        return dirction
    return jsonify(request.form) 