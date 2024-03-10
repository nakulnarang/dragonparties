from db import Database
from flask import g

db_path = 'dragonpartiestest.db'
def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = Database(db_path)
    return db

def getuser(username):
    return get_db().get_user(username)

def createuser(name, type, email, gender, username, encrypted_password):
    get_db().create_user(name, type, email, gender, username, encrypted_password)

def deleteuser():
    pass

def edituser():
    pass

def createparty(name, capacity, location, image, price, host, datetime, desc):
    get_db().create_party(name, capacity, location, image, price, host, datetime, desc)

def deleteparty():
    pass

def editparty():
    pass

def getmaps():
    pass

def getfeaturedevents():
    featuredevents = get_db().get_party_rsvp_count()[0:3];
    return  featuredevents

def getevents():
    return get_db().get_events()

def usernamecheck(username):
    user = get_db().get_user(username)
    if user:
        return True
    else:
        return False