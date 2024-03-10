import os
import service
import random
from passlib.hash import pbkdf2_sha256
from flask import Flask, g, json, render_template, request, redirect, session, jsonify, url_for
from flask_mail import Mail, Message
from flask_cors import CORS, cross_origin

app = Flask(__name__)
# CORS(app)
app.secret_key = b'demokeynotreal!'

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'teamdragonparties@gmail.com'
app.config['MAIL_PASSWORD'] = 'bols vdqb noaq melw'

mail = Mail(app)
@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.get_json()  # Get the JSON data sent with the request
    email = data.get('email')  # Extract the email address from the JSON data

    if not email:
        return jsonify({'status': 'error', 'message': 'Email address is missing'}), 400

    # Generate a 6-digit OTP
    otp = random.randint(100000, 999999)
    session['otp'] = otp  # Store OTP in session for later verification

    print("Sending email to:", email)
    msg = Message("OTP for Dragon Parties",
                  sender="teamdragonparties@gmail.com",
                  recipients=[email])  # Use the provided email address as the recipient
    msg.body = f"Your OTP for Dragon Parties is: {otp}"

    # Send email
    mail.send(msg)

    return jsonify("Message: OTP email sent")



@app.route('/verify-otp', methods=['POST'])
def verify_otp():
    user_otp = request.json.get('otp')  # Get OTP entered by the user
    if 'otp' in session and str(session['otp']) == user_otp:
        # OTP verification successful
        session.pop('otp', None)  # Remove OTP from session after verification
        print("OTP verified successfully")
        # Return a JSON response indicating success
        return jsonify({'status': 'success', 'message': 'OTP verified successfully'})
    else:
        # OTP verification failed
        print("Invalid OTP")
        # Return a JSON response indicating an error
        return jsonify({'status': 'error', 'message': 'Invalid OTP'}), 400


@app.teardown_appcontext
def close_db(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

# @app.route('/', methods=['GET', 'POST'])
# def login():
#     if request.method == 'POST':
#         username = request.json.get('username')
#         typed_password = request.json.get('password')
#         print(f"Username: {username}")
#         print(f"Password: {typed_password}")
#         if username and typed_password:
#             user = service.getuser(username)
#             if pbkdf2_sha256.verify(typed_password, user['encrypted_password']):
#                 session['user'] = user
#                 return redirect('/home')
#     return render_template('login.html')
        
@app.route('/', methods=['GET'])
def login():
    return render_template('login.html')


@app.route('/login', methods=['POST'])
def auth():
    if request.method == 'POST':
        email = request.json.get('email')
        typed_password = request.json.get('password')
        print(f"email: {email}")
        print(f"Password: {typed_password}")
        if email and typed_password:
            user = service.getuser(email)
            print(f"user: {user}")
            if pbkdf2_sha256.verify(typed_password, user['encrypted_password']):
                session['user'] = user
                print(f"session: {session['user']}")
                return jsonify({'status': 'success', 'message': 'Login successful'}), 200
            else:
                return jsonify({'status': 'error', 'message': 'Invalid credentials'}), 401
    return jsonify({'status': 'error', 'message': 'Email or password not provided'}), 400


    
@app.route('/submitAllDetails', methods=['POST'])
@cross_origin()
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

        # encrypted_password1 = pbkdf2_sha256.encrypt(password)
        # encrypted_password2 = pbkdf2_sha256.encrypt(repassword)

        # if encrypted_password1 != encrypted_password2:
        #     message = "Passwords do not match"
        #     return jsonify({'status': 'error', 'message': message})
        name = firstname + " " + lastname
        if username and password:
            encrypted_password = pbkdf2_sha256.encrypt(password)
            print(name, type, email, gender, username, encrypted_password)
            service.createuser(name, type, email, gender, username, encrypted_password)
            user = service.getuser(username)
            session['user'] = user

            #return jsonify({'status': 'success', 'message': 'User created successfully'})
            return redirect('/home')

    return jsonify({'status': 'error', 'message': 'Invalid request method'}), 405




@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/home', methods=['GET'])
def home():
    if 'user' in session:
        #user_id = session['user']['id']
        featuredevents = service.getfeaturedevents()
        print(f"session after logging in: {session['user']}")
        print(f"featured events: {featuredevents}")
        #service.getmaps()
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
