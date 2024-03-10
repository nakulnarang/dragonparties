from flask import Flask, render_template, url_for, redirect, request
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, validators
from wtforms.validators import InputRequired, Length, ValidationError, EqualTo
from flask_bcrypt import Bcrypt

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SECRET_KEY'] = 'root'

db = SQLAlchemy(app)
app.app_context().push()

bcrypt = Bcrypt(app)

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key =True)
    firstname = db.Column(db.String(50), nullable = False)
    lastname = db.Column(db.String(50), nullable = False)
    username = db.Column(db.String(20), nullable = False, unique=True)
    email = db.Column(db.String(50), nullable = False, unique =True)
    password = db.Column(db.String(80), nullable = False)

class RegisterFormone(FlaskForm):
    firstname = StringField(validators=[InputRequired(), Length(
        min=1, max=20)], render_kw= {'placeholder': "Firstname"})
    lastname = StringField(validators=[InputRequired(), Length(
        min=1, max=20)], render_kw= {'placeholder': "Lastname"})
    username = StringField(validators=[InputRequired(), Length(
        min=4, max=20)], render_kw= {'placeholder': "Username"})
    submit = SubmitField("Next")
    
    def validate_username(self, username):
        existing_user_username = User.query.filter_by(
            username=username.data).first()
        
        if existing_user_username:
            raise ValidationError(
                "That username already exists. Please choose a different one."
            )
        
class RegisterFormtwo(FlaskForm): 
    email = StringField(validators=[InputRequired(), Length(
        min=4, max=20)], render_kw= {'placeholder': "Email"})      
    password = PasswordField(validators=[InputRequired(),Length(
        min=4, max=80), EqualTo('confirm', message='Passwords must match')], render_kw= {'placeholder': "New Password"})
    confirm = PasswordField(validators=[InputRequired(),Length(
        min=4, max=80)],render_kw= {'placeholder': "Confirm Password"})
    submit = SubmitField("Register")


class LoginForm(FlaskForm):
    email = StringField(validators=[InputRequired(), Length(
        min=4, max=20)], render_kw= {'placeholder': "Email"})       
    password = PasswordField(validators=[InputRequired(),Length(
        min=4, max=80)], render_kw= {'placeholder': "New Password"})
    submit = SubmitField("Login")
        
 
            

@app.route('/' , methods = ['GET','POST'])
def login():
    form = LoginForm() 
    return render_template('login.html', form = form)

@app.route('/register',methods = ['GET','POST'])
def register():
    print(request.method)
    formone = RegisterFormone()
    formtwo = RegisterFormtwo()

    if  formtwo.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(formtwo.password.data)
        new_user = User(
            firstname = formone.firstname.data,
            lastname = formone.lastname.data,
            username = formone.username.data,
            email = formtwo.email.data,
            password=hashed_password
        )    
        db.session.add(new_user)
        db.session.commit()
        return redirect(url_for('login'))


    return render_template('register.html', formone = formone, formtwo = formtwo)

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
