
from flask import Flask, request, abort, jsonify, session
from flask_bcrypt import Bcrypt
from flask_session import Session
from config import ApplicationConfig
from flask_cors import CORS, cross_origin
from models import db, User

#import langchain stuff
import streamlit as st
from dotenv import load_dotenv
from PyPDF2 import PdfReader
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings, HuggingFaceInstructEmbeddings
from langchain.vectorstores import FAISS
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from langchain.llms import HuggingFaceHub
import os
from docx import Document
from youtube_transcript_api import YouTubeTranscriptApi as yta
import re
import requests
import json
import re
from bs4 import BeautifulSoup
import csv
from aidvi_functions import process_file, get_conversation_chain, get_text_chunks, load_vectorstore, get_vectorstore
import pickle
from werkzeug.utils import secure_filename

#the app

#login
app = Flask(__name__)
app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'None'
app.config.from_object(ApplicationConfig)


# Allow only specific file types (PDF, DOCX, CSV in this case)
ALLOWED_EXTENSIONS = {'pdf', 'docx', 'csv'}
bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)
server_session.init_app(app)
db.init_app(app)

with app.app_context():
    db.create_all()

#routes

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

#login

@app.route('/@me')
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    user = User.query.filter_by(id=user_id).first()
    print(user)
    return jsonify({
        "id": user.id,
        "firstname" : user.first_name,
        "lastname" : user.last_name,
        "address" : user.address_u,
        "email" : user.email,
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

    # Create a folder for the new user with their ID as the folder name
    user_folder_path = os.path.join("./files", str(new_User.id))
    os.makedirs(user_folder_path)

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
    #some thing to delete the sessions
    return "200"

@app.route('/create_bot', methods=['POST'])
def create_bot():
    # Get the data sent from the frontend
    data = request.json

    # Extract information from the data
    botname = data.get('botname')
    botdescription = data.get('botdescription')
    botfirstmessage = data.get('botfirstmessage')
    questions = data.get('questions')

    # Do something with the extracted data (e.g., create the bot)

    # Handle file uploads
    files = request.files.getlist('file')
    file_paths = []

    for file in files:
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)
            file_paths.append(file_path)

    # You can now use the file_paths list to access the stored files

    # Return a response indicating success
    return jsonify({'message': 'Bot created successfully!', 'file_paths': file_paths})

@app.route('/get_userbot', methods=['POST'])
def get_bot_by_user_id():
    data = request.json
    user_id = session.get("user_id")
    bot_id = data['bot_id']
    directory_path = './files/' + user_id + '/' + bot_id
    # Load the vectorstore if available or create a new one
    if not os.path.exists(directory_path+"/vectorstore.pkl"):
        result = ""
        # Iterate over all files in the directory and its subdirectories
        for root, dirs, files in os.walk(directory_path):
            for file_name in files:
                file_path = os.path.join(root, file_name)
                try:
                    abdo = process_file(file_path)
                    result += abdo
                except PermissionError as e:
                    print(f"Permission error: {e} - Skipping file: {file_path}")
        # Get chunks and create vectorstore
        chunks = get_text_chunks(result)
        get_vectorstore(chunks, directory_path)
        vectorstore = load_vectorstore(directory_path)
        # Store the vectorstore in the session
    #Include the conversation_chain in the response
    response_data = {
        "path": directory_path,
    }

    # Return the response_data as JSON response
    return jsonify(response_data)


@app.route('/get_answer', methods=['POST'])
def get_answer():
    data = request.json
    directory_path = data["directory_path"]
    question = data["question"]
    response_data = {}
    # Load the vectorstore if available or create a new one
    if os.path.exists(directory_path+"/vectorstore.pkl"):
        with open(directory_path+"/vectorstore.pkl", "rb") as f:
            vectorstore = pickle.load(f)
        # sawb snsla
        conversation_chain = get_conversation_chain(vectorstore)

        if question.strip():
            response = conversation_chain({'question': question})
            chat_history = response['chat_history']

            # Retrieve the bot's response from the chat history
            bot_response = chat_history[-1].content if chat_history else "Error: Bot response not found."

            # Add the bot's response to the response_data dictionary
            response_data['response'] = bot_response
            print(response_data)
        else:
            print("didn't enter")

        return jsonify(response_data)
    return "Error starting the bot"

if __name__ == "__main__":
    app.run(debug=True)