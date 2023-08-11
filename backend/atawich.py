from flask import Flask, request,redirect, url_for, session, jsonify
from flask_session import Session
from flask_mysqldb import MySQL
import MySQLdb.cursors
import re
import os
import binascii
from flask_cors import CORS, cross_origin  # Import the CORS module
 
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
app.secret_key = binascii.hexlify(os.urandom(16)).decode()

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'aidiv'

mysql = MySQL(app)

@cross_origin
@app.route('/login', methods=['GET', 'POST'])
def login():
    email = request.json['email']
    password = request.json['password']

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM persons WHERE Email_P = %s AND password = %s', (email, password,))
    user = cursor.fetchone()

    if user:
        # Create session variables
        session['loggedin'] = True
        session['user'] = user

        return jsonify({'message': 'Login successful', 'user': user}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@cross_origin
@app.route('/check_login', methods=['GET'])
def check_login():
    #do a check if loggedin and return a json
    print("test")

@cross_origin
@app.route('/get_user_data', methods=['GET'])
def get_user_data():
    #get user data and return it as json
    print("test")

@cross_origin
@app.route('/signup', methods=['POST'])
def signup():
    # Get the request data
    data = request.json
    first_name = data['firstName']
    last_name = data['lastName']
    address = data['address']
    email = data['email']
    password = data['password']

    # Validate the data (you can add more validation if needed)

    # Check if the email is already registered
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT * FROM persons WHERE Email_P = %s', (email,))
    account = cursor.fetchone()

    if account:
        return jsonify({'msg': 'This email is already registered.'})

    # Insert the user into the database
    cursor.execute('INSERT INTO persons (FirstName, LastName, Adress_P, Email_P, Password) VALUES (%s, %s, %s, %s, %s)',
                   (first_name, last_name, address, email, password))
    mysql.connection.commit()

    return jsonify({'msg': 'You have successfully registered!'})
from flask import jsonify, session

def ikhan():
    data = request.json
    Person_Id = data['PersonID']

    cursor = mysql.connection.cursor(dictionary=True)  # Set dictionary=True to fetch data as a dictionary
    cursor.execute('SELECT * FROM plans WHERE PersonID = %s', (Person_Id,))
    infos = cursor.fetchone()

    if infos:
        session['Max_stg_t'] = infos['Max_stg_t']
        session['Max_msg_t'] = infos['Max_msg_t']
        session['Max_bots'] = infos['Max_bots']
        session['Max_data_S'] = infos['Max_data_S']
    else:
        return jsonify({'msg': 'We could not find any infos'})
def UPmail():
    user_id = session.get("user_id")
    data = request.json
    mail = data['mail']
    cursor = mysql.connection.cursor(dictionary=True) 
    cursor.execute('UPDATE Persons SET Email_P = %s WHERE PersonID = %s', (mail, user_id))
    mysql.connection.commit()
    cursor.close()    

def UPPassword():
    user_id = session.get("user_id")
    data = request.json
    password = data['password']
    cursor = mysql.connection.cursor(dictionary=True) 
    cursor.execute('UPDATE Persons SET Password = %s WHERE PersonID = %s', (password, user_id))
    mysql.connection.commit()
    cursor.close()  

def delete():
    user_id = session.get("user_id")
    cursor = mysql.connection.cursor(dictionary=True) 
    cursor.execute('DELETE FROM Persons WHERE PersonID = %s', (user_id,))
    mysql.connection.commit()
    cursor.close()
    

if __name__ == '__main__':  # Set a secret key for session management
    app.run(debug=True)