import sqlite3


class Database:

    def __init__(self, path):
        self.conn = sqlite3.connect(path)

    def select(self, sql, parameters=[]):
        c = self.conn.cursor()
        c.execute(sql, parameters)
        return c.fetchall()

    def execute(self, sql, parameters=[]):
        c = self.conn.cursor()
        c.execute(sql, parameters)
        self.conn.commit()

    def get_user(self, username):
        data = self.select(
            'SELECT * FROM user WHERE username=?', [username])
        
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

    def get_events(self):
        data = self.select(
            'SELECT * FROM party ORDER BY id ASC')
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

    def create_party(self, party_name, location, capacity, image, desc, price, host, datetime):
        self.execute('INSERT INTO party (party_name, location, capacity, image, desc, price, host, datetime) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [party_name, location, capacity, image, desc, price, host, datetime])

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

    def close(self):
        self.conn.close()