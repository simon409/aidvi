
from flask import Flask, request, abort, jsonify, session
from flask_bcrypt import Bcrypt
from flask_session import Session
from config import ApplicationConfig
from flask_cors import CORS, cross_origin
from models import db, User, Bots, Tokens, Subscription, generate_uml_diagram, Plans

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
# This is your Stripe CLI webhook secret for testing your endpoint locally.
endpoint_secret = 'whsec_6571f7f0be3b451ddb44a49f6e17fa6f3b7cc1cd96838c796d494d5df277c0f9'

# Allow only specific file types (PDF, DOCX, CSV in this case)
ALLOWED_EXTENSIONS = {'pdf', 'docx', 'csv'}
bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)
server_session.init_app(app)
db.init_app(app)

with app.app_context():
    db.create_all()

# Generate the UML diagram
# graph = generate_uml_diagram(app)
# graph.write_png('./schema.png')

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


def get_customer_metadata(customer_id):
    try:
        # Fetch the customer object from Stripe
        customer = stripe.Customer.retrieve(customer_id)

        # Extract 'user_uuid' from the customer metadata
        user_uuid = customer.get('metadata', {}).get('user_uuid')

        return user_uuid
    except stripe.error.StripeError as e:
        print(f"Stripe Error: {e}")
        return None
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
                'user_uuid': user.id
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

@app.route('/webhook', methods=['POST'])
def stripe_webhook():
    payload = request.data

    try:
        # Verify the event by providing the Stripe endpoint secret
        event = stripe.Webhook.construct_event(payload, request.headers.get('stripe-signature'), endpoint_secret)

        # Handle different types of events
        if event.type == 'invoice.paid':
            # Your code to handle invoice payment here
            print("Invoice is paid:", event.data.object.id)
        elif event.type == 'customer.subscription.created':
            # Your code to handle subscription creation here
            subscription_id = event.data.object.id
            customer_id = event.data.object.customer
            user_uuid = get_customer_metadata(customer_id)
            amount = event.data.object.plan.amount_decimal

            print(subscription_id)
            print(user_uuid)
            
            #print(event.data.object)
            print(amount)

            # Here, 'amount' represents the subscription price in cents.
            # Use this value to determine the corresponding subscription plan in your application.

            # Example code to get the user from your database based on the user_uuid
            user = User.query.filter_by(id=user_uuid).first()
            if user:
                # Perform actions with the user (e.g., store the subscription ID in the database, send notifications, etc.)
                print("New subscription created for user:", user.id)
                new_subscription = Subscription(id=subscription_id, user_id=user_uuid)
                db.session.add(new_subscription)
                db.session.commit()

                plan_id = 1
                
                # Determine the plan based on the subscription amount
                if amount == "3000" or amount == "30000":
                    # Plan 2 (3000 or 30000)
                    plan_id = 2
                    print(plan_id)
                elif amount == "10000" or amount == "100000":
                    # Plan 3 (10000 or 100000)
                    plan_id = 3
                    print(plan_id)
                else:
                    # Handle other plan amounts or raise an error if needed
                    plan_id = None
                    print(plan_id)

                if plan_id is not None:
                    # Store the plan ID in the database or perform other actions as needed
                    # For example, if you have a 'Tokens' model:
                    tokens = Tokens.query.filter_by(PersonID=user.id).first()
                    tokens.PlanID = plan_id
                    db.session.commit()

            else:
                print("User not found for UUID:", user_uuid)

        elif event.type == 'customer.subscription.deleted':
            # Your code to handle subscription cancellation here
            print("Subscription canceled:", event.data.object.id)

        return jsonify({'status': 'success'})

    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return jsonify({'status': 'error', 'message': str(e)}), 400


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
    #check if the user can still have more bots
    bot_count = Bots.query.filter_by(TokenID=token.TokenID).count()

    plan = Plans.query.filter_by(PlanID=token.PlanID).first()
    max_bots = plan.Max_bot
    
    if token is not None:
        token_id = token.TokenID
    else:
        return "error"
    if bot_count < max_bots:
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
            if tokens.Num_Str_T <= total_tokens:
                #something
                file_to_delete = UPLOAD_FOLDER+'/'+user_id+'/'+new_Bot.BotsID
                #delete the created bot
                # Replace 'bot_to_delete' with the actual bot instance you want to delete
                bot_to_delete = session.query(Bots).filter_by(id=new_Bot.BotsID).first()

                if bot_to_delete:
                    session.delete(bot_to_delete)
                    session.commit()
                #delete the created folder
                os.remove(bot_folder_to_delete)  # This deletes the bot's folder and its contents
            else:
                tokens.Num_Str_T += total_tokens
                new_Bot.storage_tokens += total_tokens
                db.session.commit()
        else:
            return jsonify({"message": "Tokens not found for the user"}), 404
        # Return a response indicating success
        return jsonify({'message': 'Bot created successfully!'})
    else:
        return jsonify({"message": "Bots maximum has been reached"}), 400


@app.route('/get_bots')
def get_bots():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    user = User.query.filter_by(id=user_id).first()
    
    #get tokens by user id
    token = Tokens.query.filter_by(PersonID=user.id).first()
    #get plan by token id
    bots  = Bots.query.filter_by(TokenID=token.TokenID)

    # Create a list to store bot details
    bot_details = []

    # Iterate through bots and extract required attributes
    for bot in bots:
        bot_detail = {
            "id":bot.BotsID,
            "name": bot.Name,
            "created_at": bot.created_at,
            "last_sync": bot.lastsync,
            "storage_tokens": bot.storage_tokens 
        }
        bot_details.append(bot_detail)

    # Return the list of bot details as JSON
    return jsonify(bot_details)


@app.route('/get_plan')
def get_plan():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    user = User.query.filter_by(id=user_id).first()
    
    #get tokens by user id
    token = Tokens.query.filter_by(PersonID=user.id).first()
    #get plan by token id
    plan = Plans.query.filter_by(PlanID=token.PlanID).first()

    if plan:
        return jsonify({
            "plan_id":plan.PlanID,
            "type_plan":plan.Type_P,
            "max_data_src":plan.Max_data_src,
            "max_stg_t":plan.Max_Stg_t,
            "max_msg_t":plan.Max_Msg_t,
            "max_bot":plan.Max_bot,
        })
    else:
        return jsonify({
            "error": 'plan not found'
        }), 404
@app.route('/get_tokens')
def get_tokens():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    user = User.query.filter_by(id=user_id).first()
    
    #get tokens by user id
    token = Tokens.query.filter_by(PersonID=user.id).first()

    #here i should get bots by user count them
    # Get the count of bots associated with the user
    num_bots = Bots.query.filter_by(TokenID=token.TokenID).count()


    if token:
        return jsonify({
            "token_id":token.TokenID,
            "num_msg_t":token.Num_Msg_T,
            "num_stg_t":token.Num_Str_T,
            "bot_count":num_bots
        })
    else:
        return jsonify({
            "error": 'plan not found'
        }), 404

@app.route('/get_userbot', methods=['POST'])
def get_bot_by_user_id():
    data = request.json
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    bot_id = data['bot_id']
    directory_path = './files/' + user_id + '/' + bot_id
    # # Load the vectorstore if available or create a new one
    if not os.path.exists(directory_path + "/vectorstore.pkl"):
        accumulated_text = ""  # Initialize variable to accumulate text

        # Iterate over all files in the directory and its subdirectories
        for root, dirs, files in os.walk(directory_path):
            for file_name in files:
                file_path = os.path.join(root, file_name).replace("\\", "/")
                print(file_path)
                try:
                    abdo = process_file(file_path)
                    accumulated_text += abdo  # Accumulate text from each file
                except PermissionError as e:
                    print(f"Permission error: {e} - Skipping file: {file_path}")
                except Exception as e:
                    print(f"Error: {e} - Skipping file: {file_path}")

        #Get chunks and create vectorstore from accumulated text
        chunks = get_text_chunks(accumulated_text)
        get_vectorstore(chunks, directory_path)


    else:
        print("test")
    #Include the conversation_chain in the response
    #get tokens by user id
    token = Tokens.query.filter_by(PersonID=user_id).first()
    #get plan by token id
    bot = Bots.query.filter_by(BotsID=bot_id).first()
    response_data = {
        "path": directory_path,
        "name": bot.Name,
        "description": bot.Description,
        "first_message": bot.First_Message,
        "message_suggestions": bot.Message_Suggestions
    }

    # Return the response_data as JSON response
    return jsonify(response_data)


@app.route('/get_answer', methods=['POST'])
def get_answer():
    data = request.json
    directory_path = data["directory_path"]
    question = data["question"]
    response_data = {}
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    # Load the vectorstore if available or create a new one
    if os.path.exists(directory_path+"/vectorstore.pkl"):
        vectorstore = load_vectorstore(directory_path)
        # sawb snsla
        conversation_chain = get_conversation_chain(vectorstore)
        if question.strip():
            response = conversation_chain({'question': question})
            chat_history = response['chat_history']
            # Retrieve the bot's response from the chat history
            bot_response = chat_history[-1].content if chat_history else "Error: Bot response not found."
            # Add the bot's response to the response_data dictionary
            response_data['response'] = bot_response
            #add to msg tokens
            message_token_count = word_tokenize(question)
            tokens = Tokens.query.filter_by(PersonID=user_id).first()
            tokens.Num_Msg_T += len(message_token_count)
            db.session.commit()
        else:
            print("didn't enter")
        return jsonify(response_data)
    return "Error starting the bot"

if __name__ == "__main__":
    app.run(debug=True)
