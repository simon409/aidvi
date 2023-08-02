
from flask import Flask, request, abort, jsonify, session
from flask_bcrypt import Bcrypt
from flask_session import Session
from config import ApplicationConfig
from flask_cors import CORS, cross_origin
from models import db, User, Bots, Tokens

#import langchain stuff
import streamlit as st
from dotenv import load_dotenv
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
from aidvi_functions import process_file, get_conversation_chain, get_text_chunks, load_vectorstore, get_vectorstore, docs_data, csv_data
import pickle
from werkzeug.utils import secure_filename

#import files stuff
import docx
import csv
import fitz
from nltk.tokenize import word_tokenize
import stripe

#the app
load_dotenv()
#login
app = Flask(__name__)
app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'None'
app.config.from_object(ApplicationConfig)
# Add this line to define the UPLOAD_FOLDER
UPLOAD_FOLDER = './files'
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

# Allow only specific file types (PDF, DOCX, CSV in this case)
ALLOWED_EXTENSIONS = {'pdf', 'docx', 'csv'}
bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)
server_session.init_app(app)
db.init_app(app)

with app.app_context():
    db.create_all()

# Function to calculate total tokens in text
def pdf__data(pdf_path):
    text = ""
    # Open the PDF file
    doc = fitz.open(pdf_path)

    # Iterate through all pages
    for page_num in range(doc.page_count):
        # Get the page
        page = doc.load_page(page_num)

        # Extract text from the page
        page_text = page.get_text("text")
        text += page_text

    # Close the PDF file
    doc.close()

    return text

def count_tokens(text):
    tokens = word_tokenize(text)
    return len(tokens)



#routes

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

#login
@app.route('/create_subscription', methods=['POST'])
def create_subscription():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    user = User.query.filter_by(id=user_id).first()

    try:
        # Step 3: Create a subscription plan in Stripe (e.g., $10/month)
        payment_method_id = request.json['payment_method_id']
        repeativity = request.json['repeativity']
        amount = request.json['amount']
        product_name = ""

        if(amount == 3000):
            if(repeativity == "month"):
                product_name = "Aidvi subscription (monthly subscription - 30$)"
            else:
                product_name = "Aidvi subscription (yearly subscription - 300$)"
        else:
            if(repeativity == "month"):
                product_name = "Aidvi subscription (monthly subscription - 100$)"
            else:
                product_name = "Aidvi subscription (yearly subscription - 1000$)"
        plan = stripe.Plan.create(
            amount=amount,
            currency='usd',
            interval=repeativity,
            product={
                'name': product_name,
            }
        )

        # Step 4: Collect payment information on the frontend using Stripe Elements or PaymentIntents API.
        # For simplicity, let's assume the payment method ID is provided in the request
        
        email = user.email
        full_name = user.first_name + " "+ user.last_name

        # Step 5: Create a customer in Stripe (with payment information)
        customer = stripe.Customer.create(
            email=user.email,
            name=user.first_name + " " + user.last_name,
            payment_method=payment_method_id,  # Use payment_method parameter instead of source
            invoice_settings={
                'default_payment_method': payment_method_id,  # Set default payment method for future invoices
            },
            metadata={
                "additional_info": "Any additional metadata you want to store"
            }
        )

        # Step 6: Create a subscription for the customer
        subscription = stripe.Subscription.create(
            customer=customer.id,
            items=[
                {
                    'plan': plan.id,
                },
            ],
            default_payment_method=payment_method_id,  # Set the default payment method for the subscription
            expand=['latest_invoice.payment_intent']  # Expand the payment_intent object within the latest_invoice
        )

        # Get the client secret from the subscription and return it to the frontend
        return jsonify({'message': "nice",'client_secret': subscription.latest_invoice.payment_intent.client_secret, "subscription_id":subscription.id}), 200

    except Exception as e:
        print(str(e))
        return jsonify({
            "message" : str(e)
        }), 500

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
    new_Token = Tokens(Num_Msg_T=0, Num_Str_T=0, PlanID=1, PersonID=new_User.id)
    db.session.add(new_Token)
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
    # Check if the user is logged in
    if 'user_id' in session:
        # Clear the session to log out the user
        session.pop('user_id', None)
        return jsonify({"msg": "Logged out successfully"}), 200
    else:
        return jsonify({"msg": "User is not logged in"}), 401

@app.route('/create_bot', methods=['POST'])
def create_bot():
    # Get the data sent from the frontend
    data = request.form  # Use request.form to get the data from FormData
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    # Extract information from the data
    botname = data.get('botname')
    botdescription = data.get('botdescription')
    botfirstmessage = data.get('botfirstmessage')
    questions = data.get('questions')

    # Retrieve the files from FormData
    files = request.files.getlist('files[]')
    user_folder_path = os.path.join(UPLOAD_FOLDER, str(user_id))
    #get the tokens id based on the user id
    token = Tokens.query.filter_by(PersonID=user_id).first()
    
    if token is not None:
        token_id = token.TokenID
    else:
        return "error"
    #add the bot
    new_Bot = Bots(Name=botname, Description=botdescription, First_Message=botfirstmessage, Message_Suggestions=questions, TokenID=token_id)
    db.session.add(new_Bot)
    db.session.commit()

    # Create a folder for the user if it doesn't exist
    if not os.path.exists(user_folder_path):
        os.makedirs(user_folder_path)

    bot_folder_path = os.path.join(user_folder_path, new_Bot.BotsID)

    # Create a folder for the bot
    if not os.path.exists(bot_folder_path):
        os.makedirs(bot_folder_path)

    file_paths = []

    for file in files:
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = os.path.join(bot_folder_path, filename)
            file.save(file_path)
            file_paths.append(file_path)

    # You can now use the file_paths list to access the stored files
    total_tokens = 0
    # Process DOCX files
    for filename in os.listdir(UPLOAD_FOLDER+'/'+user_id+'/'+new_Bot.BotsID):
        if filename.endswith('.docx'):
            docx_file_path = UPLOAD_FOLDER+'/'+user_id+'/'+new_Bot.BotsID+'/'+filename
            print(docx_file_path)
            text_content = docs_data(docx_file_path)
            total_tokens += count_tokens(text_content)

    # Process PDF files
    for filename in os.listdir(UPLOAD_FOLDER+'/'+user_id+'/'+new_Bot.BotsID):
        if filename.endswith('.pdf'):
            pdf_file_path = UPLOAD_FOLDER+'/'+user_id+'/'+new_Bot.BotsID+'/'+filename
            print(pdf_file_path)
            text_content = pdf__data(pdf_file_path)
            total_tokens += count_tokens(text_content)

    # Process CSV files
    for filename in os.listdir(UPLOAD_FOLDER+'/'+user_id+'/'+new_Bot.BotsID):
        if filename.endswith('.csv'):
            csv_file_path = UPLOAD_FOLDER+'/'+user_id+'/'+new_Bot.BotsID+'/'+filename
            print(docx_file_path)
            #Assuming 'text_column' contains the text content in the CSV file
            text_content = csv_data(csv_file_path, 'text_column')
            total_tokens += count_tokens(text_content)

    tokens = Tokens.query.filter_by(PersonID=user_id).first()

    #check if the token not bigger than max tokens and some more tests

    if tokens:
        # Add the new total_tokens value to the existing Num_Str_T value
        tokens.Num_Str_T += total_tokens
        db.session.commit()
    else:
        return jsonify({"error": "Tokens not found for the user"}), 404
    # Return a response indicating success
    return jsonify({'message': 'Bot created successfully!', 'file_paths': "test"})

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