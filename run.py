import os
import service

from passlib.hash import pbkdf2_sha256
from flask import Flask, g, json, render_template, request, redirect, session, jsonify

app = Flask(__name__)
app.secret_key = b'demokeynotreal!'

@app.teardown_appcontext
def close_db(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        typed_password = request.form['password']
        if username and typed_password:
            user = service.getuser(username)
            if pbkdf2_sha256.verify(typed_password, user['encrypted_password']):
                session['user'] = user
                return redirect('/')
    return render_template('login.html')

@app.route('/register')
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']
        type = request.form['type']
        gender = request.form['gender']
        name = request.form['name']
        if username and password:
            encrypted_password = pbkdf2_sha256.encrypt(password)
            service.createuser(name, type, email, gender, username, encrypted_password)
            return redirect('/')
    return render_template('register.html')

@app.route('/home', methods=['GET'])
def home():
    if 'user' in session:
        user_id = session['user']['user_id']
        service.getfeaturedevents()
        service.getmaps()
        return render_template('home.html')
        #return jsonify(response)
    else:
        return jsonify('Error: User not authenticated')
        
@app.route('/host')
def host():
    return render_template('host.html')

@app.route('/createEvent', methods=['POST'])
def createevent():
    if request.method == 'POST':
        name = request.form['name']
        capacity = request.form['capacity']
        location = request.form['location']
        image = request.form['image']
        price = request.form['price']
        host = request.form['host']
        datetime = request.form['datetime']
        desc = request.form['desc']
        if name and capacity and location and image and price and host and datetime and desc:
            service.createparty(name, capacity, location, image, price, host, datetime, desc)
            return redirect('/home')
        else:
            return jsonify('Error: Missing parameters') 

@app.route('/viewEvents')
def viewevents():
    return render_template('viewEventsTest.html')

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect('/')
    
if __name__ == '__main__':
    app.run(host='localhost', port=8080, debug=True)
