import os
import service
from service import getlocations
from passlib.hash import pbkdf2_sha256
from flask import Flask, g, json, render_template, request, redirect, session, jsonify, url_for, render_template_string
import folium
from geopy.geocoders import ArcGIS

UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')

nom = ArcGIS()
app = Flask(__name__)
app.secret_key = b'demokeynotreal!'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.teardown_appcontext
def close_db(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

@app.route('/', methods=['GET', 'POST'])
def login():
    print(service.getlocations())
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
        email = request.json.get('drexelEmail')
        #type = request.form.get('type')
        type = "guest"
        gender = request.json.get('gender')
        firstname = request.json.get('firstName')
        lastname = request.json.get('lastName')
        print(f"Username: {username}")
        print(f"Password: {password}")
        print(f"Email: {email}")
        print(f"Type: {type}")
        print(f"gender: {gender}")
        print(f"first name: {firstname}")
        print(f"last name: {lastname}")
        name = firstname + " " + lastname
        if username and password:
            encrypted_password = pbkdf2_sha256.encrypt(password)
            service.createuser(name, type, email, gender, username, encrypted_password)
            return redirect('/')
    # data = request.json  # Get JSON data sent from the AJAX call
    # firstName = data.get('firstName')
    # lastName = data.get('lastName')
    # username = data.get('username')
    # gender = data.get('gender')
    # drexelEmail = data.get('drexelEmail')
    # password1 = data.get('password1')
    # password2 = data.get('password2')

    # print(f"First Name: {firstName}")
    # print(f"Last Name: {lastName}")
    # print(f"Username: {username}")
    # print(f"Gender: {gender}")
    # print(f"Drexel Email: {drexelEmail}")
    # print(f"Password1: {password1}")
    # print(f"Password2: {password2}")

    # Process the data here (e.g., save to database, perform validations)

    # Return a JSON response indicating success or providing additional data
    #return jsonify({'status': 'success', 'message': 'All details submitted successfully'})
    return render_template('register.html')



def create_folium_map(locations):
    # Create Folium map centered at the first location
    my_map = folium.Map(location=[locations[0].latitude, locations[0].longitude], zoom_start=12)
    
    # Add markers for each location
    for location in locations:
        address = location.address if location.address else "Unknown Address"
        add_marker(my_map, location, address)

    # Save the map as an HTML string
    my_map.get_root().width = '1000px'
    my_map.get_root().height = "500px"
    iframe = my_map.get_root()._repr_html_()
    #map_html = my_map.get_root().render()

    return iframe

def add_marker(my_map, location, popup_text):
    folium.Marker(
        location=[location.latitude, location.longitude],
        popup=popup_text,
        icon=folium.Icon(color='blue')
    ).add_to(my_map)


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
    # print(request.form['email'])
    return render_template('register.html')

@app.route('/home', methods=['GET'])
def home():
    if 'user' in session:
        #user_id = session['user']['user_id']
        service.getfeaturedevents()
        locations = getlocations()
        all_coordinates = []
        for location in locations:
            coordinates = nom.geocode(location)
            all_coordinates.append(coordinates)
        iframe = create_folium_map(all_coordinates)
        return render_template('home.html', iframe= iframe)
        
    else:
        return jsonify('Error: User not authenticated')
        
@app.route('/host')
def host():
    return render_template('host.html')

@app.route('/createEvent', methods=['POST'])
def createevent():
    if request.method == 'POST':
        name = request.form['eventName']
        capacity = request.form['capacity']
        location = request.form['location']
        #image = save_uploaded_file(request.files['eventImage'])
        print(f"Image File Path: {image}")
        price = request.form['ticketPrice']
        host = session['user']['username']  # Assuming user is authenticated
        datetime = request.form['eventDate'] + ' ' + request.form['eventTime']
        desc = request.form['eventDescription']

        if name and capacity and location and image and price and host and datetime and desc:
            service.createparty(name, capacity, location, image, price, host, datetime, desc)
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
    if 'user' in session:
        user_details = session['user']
        return render_template('profile.html', user_details=user_details)
    else:
        # Redirect to the home page or another route if the user is not in the session
        return redirect(url_for('home'))
    
@app.route('/get_user_details', methods=['GET'])
def get_user_details():
    if 'user' in session:
        user_details = session['user']
        print(user_details)
        return jsonify({
            'name': user_details.get('name'),
            'username': user_details.get('username'),
            'email': user_details.get('email'),
            'gender': user_details.get('gender')
            # Add more user details as needed
        })
    else:
        return jsonify({'error': 'User not authenticated'})

if __name__ == '__main__':
    app.run(host='localhost', port=8080, debug=True)
