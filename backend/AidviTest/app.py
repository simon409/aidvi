
from flask import Flask, request, abort, jsonify, session
from flask_bcrypt import Bcrypt
from flask_session import Session
from config import ApplicationConfig
from flask_cors import CORS, cross_origin
from models import db, User

app = Flask(__name__)
app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'None'
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)
server_session.init_app(app)
db.init_app(app)

with app.app_context():
    db.create_all()

#routes

@app.route('/@me')
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "email": user.email
    })

@app.route("/register", methods=["POST"])
def register_User():
    # Get the request data
    data = request.json
    first_name = data['firstName']
    last_name = data['lastName']
    address_u = data['address']
    email = data['email']
    password = data['password']

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "This email already being used"}), 409
    
    hashed_pass = bcrypt.generate_password_hash(password)
    new_User = User( first_name=first_name, last_name=last_name , address_u=address_u ,email=email, password=hashed_pass)
    db.session.add(new_User)
    db.session.commit()

    session["user_id"] = new_User.id

    return jsonify({
        "id": new_User.id,
        "email": new_User.email
    })

@app.route('/login', methods=['POST'])
def login_user():
     # Get the request data
    data = request.json
    email = data['email']
    password = data['password']

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"msg": "Unauthorized"}), 401
    
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"msg": "Unauthorized"}), 401

    session["user_id"] = user.id
    return jsonify({
        "id": user.id,
        "msg": "authorized",
        "email": user.email
    })

@app.route('/logout', methods=['POST'])
def logout_user():
    session.pop("user_id")
    return "200"

if __name__ == "__main__":
    app.run(debug=True)