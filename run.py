import os
import service

from passlib.hash import pbkdf2_sha256
from flask import Flask, g, json, render_template, request, redirect, session, jsonify, url_for

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
        username = request.json.get('username')
        typed_password = request.json.get('password')
        print(f"Username: {username}")
        print(f"Password: {typed_password}")
        if username and typed_password:
            user = service.getuser(username)
            if pbkdf2_sha256.verify(typed_password, user['encrypted_password']):
                session['user'] = user
                return redirect('/home')
    return render_template('login.html')

@app.route('/login', methods=['GET', 'POST'])
def auth():
    if request.method == 'POST':
        email = request.json.get('email')
        typed_password = request.json.get('password')
        print(f"email: {email}")
        print(f"Password: {typed_password}")
        if email and typed_password:
            user = service.getuser(email)
            if pbkdf2_sha256.verify(typed_password, user['encrypted_password']):
                session['user'] = user
                return redirect('/home')
    return redirect('/')
    
@app.route('/submitAllDetails', methods=['POST'])
def submitAllDetails():
    if request.method == 'POST':
        username = request.json.get('username')
        password = request.json.get('password1')
        repassword = request.json.get('password2')
        email = request.json.get('drexelEmail')
        # type = request.form.get('type')
        type = "guest"
        gender = request.json.get('gender')
        firstname = request.json.get('firstName')
        lastname = request.json.get('lastName')
        encrypted_password1 = pbkdf2_sha256.encrypt(password)
        encrypted_password2 = pbkdf2_sha256.encrypt(repassword)
        if encrypted_password1 != encrypted_password2:
            message = "Passwords do not match"
            return jsonify({'status': 'error', 'message': message})
        name = firstname + " " + lastname
        if username and password:
            encrypted_password = pbkdf2_sha256.encrypt(password)
            service.createuser(name, type, email, gender, username, encrypted_password)
            return redirect('/')

    # Process the data here (e.g., save to database, perform validations)

    # Return a JSON response indicating success or providing additional data
    #return jsonify({'status': 'success', 'message': 'All details submitted successfully'})
    return render_template('register.html')




@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/home', methods=['GET'])
def home():
    if 'user' in session:
        #user_id = session['user']['user_id']
        featuredevents = service.getfeaturedevents()
        print(f"featured events: {featuredevents}")
        service.getmaps()
        return render_template('home.html')
    else:
        return jsonify('Error: User not authenticated')
        
@app.route('/host')
def host():
    return render_template('host.html')

@app.route('/createEvent', methods=['POST'])
def createevent():
    if request.method == 'POST':
        name = request.form.get('eventName')
        capacity = request.form.get('capacity')
        location = request.form.get('location')
        # image_name = request.json.get['image']
        price = request.form.get('ticketPrice')
        # host = request.json.get['host']
        date = request.form.get('date')
        time = request.form.get('time')
        desc = request.form.get('eventDescription')
        image = request.files['eventImage']
        datetime = date + " " + time
        
        print(session['user'])
        host = session['user']['id']

        if 'eventImage' not in request.files:
            img_path = service.generaterandomimage()
        else:
            img_path = service.saveimage(image)

        if name and capacity and location and img_path and price and host and datetime and desc:
            service.createparty(name, capacity, location, img_path, price, host, datetime, desc)
            return redirect('/home')
        else:
            return jsonify('Error: Missing parameters')

@app.route('/viewEvents')
def viewevents():
    return render_template('viewEvents.html')

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect('/')
    
@app.route('/profile')
def profile():
    return render_template('profile.html')

if __name__ == '__main__':
    app.run(host='localhost', port=8080, debug=True)
