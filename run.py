import os

from flask import Flask, g, json, jsonify, redirect, render_template, request, url_for

app = Flask(__name__)

@app.route('/')
def login():
    return render_template('login.html')

@app.route('/submitDetails', methods=['POST'])
def submitDetails():
    print(request.form['email'])
    print(request.form['password'])
    # return render_template('home.html')
    
@app.route('/submitAllDetails', methods=['POST'])
def submitAllDetails():
    data = request.json  # Get JSON data sent from the AJAX call
    firstName = data.get('firstName')
    lastName = data.get('lastName')
    username = data.get('username')
    gender = data.get('gender')
    drexelEmail = data.get('drexelEmail')
    password1 = data.get('password1')
    password2 = data.get('password2')

    print(f"First Name: {firstName}")
    print(f"Last Name: {lastName}")
    print(f"Username: {username}")
    print(f"Gender: {gender}")
    print(f"Drexel Email: {drexelEmail}")
    print(f"Password1: {password1}")
    print(f"Password2: {password2}")

    # Process the data here (e.g., save to database, perform validations)

    # Return a JSON response indicating success or providing additional data
    return jsonify({'status': 'success', 'message': 'All details submitted successfully'})




@app.route('/register')
def register():
    # print(request.form['email'])
    return render_template('register.html')

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/host')
def host():
    return render_template('host.html')

@app.route('/viewEvents')
def viewEvents():
    return render_template('viewEvents.html')
    
if __name__ == '__main__':
    app.run(host='localhost', port=8080, debug=True)
