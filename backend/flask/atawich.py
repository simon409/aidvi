from flask import Flask,render_template, request,redirect, url_for, session
from flask_mysqldb import MySQL
import MySQLdb.cursors
import re
 
app = Flask(__name__)
 
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'WheelyStrongPwd'
app.config['MYSQL_DB'] = 'aidiv'
 
mysql = MySQL(app)

@app.route('/aidivlogin/', methods=['GET', 'POST'])
def login():
    # Output a message
    msg = ''
    # Check if "email" and "password" are there
    if request.method == 'POST' and 'email' in request.form and 'password' in request.form:
        email = request.form['email']
        password = request.form['password']
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM Persons WHERE email = %s AND password = %s', (email, password,))
        account = cursor.fetchone()
        if account:
            session['loggedin'] = True
            session['id'] = account['id']
            session['username'] = account['username']
            return redirect(url_for('landing'))
        else:
            # Person doesn't exist or email or password is incorrect
            msg = 'Incorrect email or password!'
    return redirect(url_for('landing', msg=msg))





@app.route('/signup', methods=['POST'])
def signup():
    msg = ''
    # Check if "email" and "password" are there

    if 'email' in request.form and 'password' in request.form:
        # Creating variables that we will need

        LastName = request.form["LastName"]
        FirstName = request.form["FirstName"]
        Adresse_P = request.form["Adresse_P"]
        email = request.form["email"]
        password = request.form["password"]
        
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM Persons WHERE email = %s', (email,))
        req_res = cursor.fetchone()
        # validatte each imput before we answer anything

        if req_res:
            msg = "This email is already registered."
        elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
            msg = 'Invalid email address!'
        elif not LastName or not FirstName or not Adresse_P or not password or not email:
            msg = 'Please fill out the form!'
        else:
            cursor.execute('INSERT INTO Persons (LastName, FirstName, Address_P, password, email) VALUES (%s, %s, %s, %s, %s)',
                           (LastName, FirstName, Adresse_P, password, email))
            mysql.connection.commit()
            msg = 'You have successfully registered!'
            return redirect(url_for('landing'))
    
    return redirect(url_for('landing', msg=msg))


@app.route('/landing')
def landing():
    return render_template('landing.jsx')



