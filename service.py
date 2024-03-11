from db import Database
from flask import g
import os

db_path = 'dragonpartiestest.db'
def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = Database(db_path)
    return db

def getuser(email):
    return get_db().get_user(email)

def getlocations():
    return get_db().get_party_locations()

def getimages():
    return get_db().get_party_images()

def createuser(name, type, email, gender, username, encrypted_password):
    get_db().create_user(name, type, email, gender, username, encrypted_password)

def deleteuser():
    pass

def edituser():
    pass

def createparty(party_name, location, capacity,price, host, datetime, desc, image):
    get_db().create_party(party_name, location, capacity,price, host, datetime, desc, image)

def deleteparty():
    pass

def editparty():
    pass

def getmaps():
    pass

def getfeaturedevents():
    #featuredevents = get_db().get_party_rsvp_count()[0:3];
    #print(f"featured events: {featuredevents}")
    #print(type(featuredevents))
    featuredevents = get_db().get_featured_events()
    fe = []
    for event in featuredevents:
        id = event['party']
        e = get_db().get_event(id)
        fe.append(e)
    return fe

def getevents():
    return get_db().get_all_events()

def usernamecheck(username):
    user = get_db().get_user(username)
    if user:
        return True
    else:
        return False
    
def saveimage(file):
    file_path = os.path.join('uploads', file.filename)
    file.save(file_path)
    return file_path

def generaterandomimage():
    return 'uploads/default.jpg'

def createmapping(party, attendee):
    get_db().create_mapping(party, attendee)
    