from flask import Flask, request,redirect, url_for, session, jsonify
from flask_session import Session
from flask_mysqldb import MySQL
import MySQLdb.cursors
import re
import os
import binascii
from flask_cors import CORS  # Import the CORS module
 
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
app.secret_key = binascii.hexlify(os.urandom(16)).decode()

 
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'aidvi'
 
mysql = MySQL(app)

@app.route('/login', methods=['GET', 'POST'])
def login():
    email = request.json['email']
    password = request.json['password']

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM Persons WHERE Email_P = %s AND password = %s', (email, password,))
    user = cursor.fetchone()

    if user:
        # Create session variables
        session['loggedin'] = True
        session['user'] = user

        return jsonify({'message': 'Login successful', 'user': user}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401


@app.route('/check_login', methods=['GET'])
def check_login():
    #do a check if loggedin and return a json
    print("test")

@app.route('/get_user_data', methods=['GET'])
def get_user_data():
    #get user data and return it as json
    print("test")


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
    cursor.execute('SELECT * FROM Persons WHERE Email_P = %s', (email,))
    account = cursor.fetchone()

    if account:
        return jsonify({'msg': 'This email is already registered.'})

    # Insert the user into the database
    cursor.execute('INSERT INTO Persons (FirstName, LastName, Adress_P, Email_P, Password) VALUES (%s, %s, %s, %s, %s)',
                   (first_name, last_name, address, email, password))
    mysql.connection.commit()

    return jsonify({'msg': 'You have successfully registered!'})

if __name__ == '__main__':  # Set a secret key for session management
    app.run(debug=True)