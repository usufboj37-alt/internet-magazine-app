from sqlalchemy.orm import DeclarativeBase,relationship
from sqlalchemy import Column,String,Integer,Float,Enum,ForeignKey
from app.enums import CategoryEnum
class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__='users'
    
    id=Column(Integer,primary_key=True)
    login=Column(String)
    password=Column(String)
    wallets=relationship(
        'Product',
        back_populates='user'
    )
    
class Product(Base):
    __tablename__='Products'
    
    id=Column(Integer,primary_key=True)
    name=Column(String)
    price=Column(Float)
    category=Column(Enum(CategoryEnum))
    user_id=Column(Integer,ForeignKey('users.id'),nullable=False)
    user=relationship(
        'User',
        back_populates='wallets'
    )
