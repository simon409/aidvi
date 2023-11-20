from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
from sqlalchemy import Column, Integer, ForeignKey, MetaData, create_engine, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from sqlalchemy_schemadisplay import create_uml_graph

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    address_u = db.Column(db.String(150))
    email = db.Column(db.String(345), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    # Define the relationship with User table
    tokens = relationship("Tokens", back_populates="user")
    # Define the one-to-many relationship with Subscription table
    subscriptions = relationship("Subscription", back_populates="user")


class Subscription(db.Model):
    __tablename__ = "subscriptions"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    user_id = db.Column(db.String(32), db.ForeignKey("users.id"), nullable=False)
    # Add more subscription-related columns as needed (e.g., subscription_status, subscription_level, etc.)
    # Define the many-to-one relationship with User table
    user = relationship("User", back_populates="subscriptions")

class Plans(db.Model):
    __tablename__ = "plans"
    PlanID = db.Column(Integer, primary_key=True, unique=True, autoincrement=True)
    Type_P = db.Column(db.String(50), nullable=False)
    Max_data_src = Column(Integer, nullable=False)    
    Max_Stg_t = Column(Integer, nullable=False)    
    Max_Msg_t = Column(Integer, nullable=False)   
    Max_bot = Column(Integer, nullable=False)   
    
    # Define the relationship with Tokens table
    tokens = relationship("Tokens", back_populates="plan")

class Tokens(db.Model):
    __tablename__ = "tokens"
    TokenID = Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    Num_Msg_T = Column(Integer, nullable=False)
    Num_Str_T = Column(Integer, nullable=False)
    PlanID = Column(Integer, ForeignKey('plans.PlanID', ondelete='CASCADE', onupdate='CASCADE'), nullable=False)

    # Define the foreign key column
    PersonID = Column(db.String(32), ForeignKey('users.id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False)
    
    # Define the relationship with User table
    user = relationship("User", back_populates="tokens")
    
    # Define the relationship with Plans table
    plan = relationship("Plans", back_populates="tokens")
    # Define the relationship with Bots table
    bots = relationship("Bots", back_populates="token")

class Bots(db.Model):
    __tablename__ = "bots"
    BotsID = Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    Name = Column(db.String(100), nullable=False)
    Description = Column(db.String(200), nullable=False)
    First_Message = Column(db.String(500), nullable=False)
    Message_Suggestions = Column(db.String(500), nullable=True)
    TokenID = Column(db.String(32), ForeignKey('tokens.TokenID', ondelete='CASCADE', onupdate='CASCADE'), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    lastsync = Column(DateTime(timezone=True), default=None)
    storage_tokens = Column(Integer, default=0)
    token = relationship("Tokens", back_populates="bots")

# If you want to generate the UML diagram and save it to a file, you can do the following:

def generate_uml_diagram(app):
    # Create a MetaData object
    metadata = db.MetaData()

    # Manually bind the MetaData object to the engine (using the Flask app's database URI)
    with app.app_context():
        metadata.bind = db.engine

        # Reflect the tables to the metadata with the specified bind
        metadata.reflect(bind=db.engine)

    # Get the mappers for all the classes defined in the model
    mappers = [db.class_mapper(cls) for cls in [User, Subscription, Plans, Tokens, Bots]]

    # Create the graph and return it
    return create_uml_graph(mappers,
        show_operations=False, # not necessary in this case
        show_multiplicity_one=True # some people like to see the ones, some don't
    )