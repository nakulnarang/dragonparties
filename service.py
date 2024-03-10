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

def deleteuser(username):
    get_db().delete_user(username)

def edituser(username, new_name, new_email, new_gender, new_encrypted_password):
    get_db().edit_user(username, new_name, new_email, new_gender, new_encrypted_password)

def createparty(name, capacity, location, image, price, host, datetime, desc):
    get_db().create_party(name, capacity, location, image, price, host, datetime, desc)

def deleteparty(party_id):
    get_db().delete_party(party_id)

def editparty(party_id, new_name, new_location, new_capacity, new_image, new_desc, new_price, new_host, new_datetime):
    get_db().edit_party(party_id, new_name, new_location, new_capacity, new_image, new_desc, new_price, new_host, new_datetime)

def getlocations():
    return get_db().get_party_locations()
    

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