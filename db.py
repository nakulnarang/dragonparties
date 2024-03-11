import sqlite3


class Database:

    def __init__(self, path):
        self.conn = sqlite3.connect(path)

    def select(self, sql, parameters=[]):
        c = self.conn.cursor()
        # if parameters is None:
        #     parameters = ()
        c.execute(sql, parameters)
        return c.fetchall()

    def execute(self, sql, parameters=[]):
        c = self.conn.cursor()
        c.execute(sql, parameters)
        self.conn.commit()

    def get_user(self, email):
        data = self.select(
            'SELECT * FROM user WHERE email=?', [email])
        
        if len(data) == 0:
            return None
        
        return {
            'id': data[0][0],
            'name': data[0][1],
            'type': data[0][2],
            'email': data[0][3],
            'gender': data[0][4],
            'username': data[0][5],
            'encrypted_password': data[0][6]
        }
    def get_party_locations(self):
        data = self.select('SELECT DISTINCT location FROM party')
        return [d[0] for d in data]
    
    def get_party_images(self):
        data = self.select('SELECT image FROM party')
        return [d[0] for d in data]

    def get_all_events(self):
        data = self.select(
            'SELECT * FROM party ORDER BY party_id ASC')
        return [{
            'party_id': d[0],
            'party_name': d[1],
            'location': d[2],
            'capacity': d[3],
            'price': d[4],
            'host': d[5],
            'datetime': d[6],
            'desc': d[7],
            'image': d[8]
        } for d in data]
    
    def get_events(self, ids):
        if not isinstance(ids, (tuple, list)):
            ids = (ids,)
        data = self.select(
            'SELECT * FROM party WHERE party_id IN (%s)'% ','.join('?'*len(ids)), ids)
        return [{
            'party_id': d[0],
            'party_name': d[1],
            'capacity': d[2],
            'location': d[3],
            'image': d[4],
            'price': d[5],
            'host': d[6],
            'datetime': d[7],
            'desc': d[8]
        } for d in data]
    
    def get_event(self, id):
        data = self.select('SELECT * FROM party WHERE party_id=?', [id])
        print(f"Data: {data}")
        if len(data) == 0:
            return None
        return {
            'party_id': data[0][0],
            'party_name': data[0][1],
            'capacity': data[0][2],
            'location': data[0][3],
            'image': data[0][4],
            'price': data[0][5],
            'host': data[0][6],
            'datetime': data[0][7],
            'desc': data[0][8] 
        }
        
    
    def get_featured_events(self):
        data = self.select('SELECT COUNT(*) as party_count, party FROM mappingtable ORDER BY party DESC LIMIT 3')
        return [{
            'party_count': d[0],
            'party': d[1]
        } for d in data]
    
    def get_party_rsvp_count(self):
        data = self.select('SELECT COUNT(*) as party_count, party FROM mappingtable ORDER BY party_count DESC')
        return [{
            'party_count': d[0],
            'party': d[1]
        } for d in data]

    def get_num_events(self):
        data = self.select('SELECT COUNT(*) FROM party')
        return data[0][0]
    
    def get_num_users(self):
        data = self.select('SELECT COUNT(*) FROM user')
        return data[0][0]

    # def update_user(self, uid, adopted):
    #     self.execute('UPDATE goats SET adopted=? WHERE uid=?', [adopted, uid])

    def create_user(self, name, type, email, gender, username, encrypted_password):
        self.execute('INSERT INTO user (name, type, email, gender, username, encrypted_password) VALUES (?, ?, ?, ?, ?, ?)', [name, type, email, gender, username, encrypted_password])
        print("User created yay")

    def create_party(self, party_name, location, capacity,price, host, datetime, desc, image):
        self.execute('INSERT INTO party (party_name, location, capacity,price, host, datetime, desc, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [party_name, location, capacity,price, host, datetime, desc, image])

    def get_guest_list(self, id):
        data = self.select('SELECT attendees FROM mappingtable WHERE party=?', [id])
        return [d[0] for d in data]
    
    def get_user_rsvp(self, uid):
        data = self.select('SELECT party_name, party_id, location, capacity, price, host, datetime, desc FROM mappingtable JOIN party WHERE attendees=?', [uid])
        return [{
            'name':d[0],
            'id':d[1],
            'location':d[2],
            'capacity':d[3],
            'price':d[4],
            'host':d[5],
            'datetime':d[6],
            'desc':d[7]
            } for d in data]
    
    def create_mapping(self, party, attendees):
            self.execute('INSERT INTO mappingtable (party, attendees) VALUES (?, ?)', [party, attendees])
        
    def select_party_for_mapping(self, party_name, location, datetime, host, capacity, price):
            parameters = (party_name, location, datetime, host, capacity, price)  # Convert to tuple
            print(parameters)
            data = self.select('SELECT party_id FROM party WHERE party_name=? AND location=? AND datetime=? AND host=? AND capacity=? AND price=?', parameters)
            return data

    def create_mapping(self, party, user):
        self.execute('INSERT INTO mappingtable (party, attendees) VALUES (?, ?)', [party, user])

    def get_host_events(self, uid):
        data = self.select('SELECT * FROM party WHERE host=?', [uid])
        return [{
            'party_id': d[0],
            'party_name': d[1],
            'location': d[2],
            'capacity': d[3],
            'price': d[4],
            'host': d[5],
            'datetime': d[6],
            'desc': d[7],
            'image': d[8]
        } for d in data]

    def close(self):
            self.conn.close()
