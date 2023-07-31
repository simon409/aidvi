from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

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

class Plans(db.Model):
    __tablename__ = "plans"
    PlanID = db.Column(Integer, primary_key=True, unique=True, autoincrement=True)
    Type_P = db.Column(db.String(50), nullable=False)
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
    
    # Define the relationship with Tokens table
    token = relationship("Tokens", back_populates="bots")
