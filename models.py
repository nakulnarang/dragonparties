from app import db, login_manager
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    firstname = db.Column(db.String(128))
    lastname = db.Column(db.String(128))
    username = db.Column(db.String(64), index=True, unique=True)
    gender = db.Column(db.String(64))
    email = db.Column(db.String(120), unique=True, index=True)
    password_hash = db.Column(db.String(128)) 
    joined_at = db.Column(db.DateTime(), index=True, default=datetime.utcnow)

def __repr__(self):
    return '<User {}>'.format(self.username)

def set_password(self, password):
    self.password_hash = generate_password_hash(password)

def check_password(self, password):
    return check_password_hash(self.password_hash, password)