import os

from flask import Flask, g, json, render_template, request

app = Flask(__name__)

@app.route('/')
def login():
    return render_template('login.html')

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/host')
def host():
    return render_template('host.html')

@app.route('/viewEvents')
def viewEvents():
    return render_template('viewEventsTest.html')
    
if __name__ == '__main__':
    app.run(host='localhost', port=8080, debug=True)
