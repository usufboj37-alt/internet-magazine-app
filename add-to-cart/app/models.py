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
    products=relationship(
        'Product',
        back_populates='user'
    )
    cart_items = relationship(
    "CartItem",
    back_populates="user",
    cascade="all, delete-orphan"
)
    
class Product(Base):
    __tablename__='Products'
    
    id=Column(Integer,primary_key=True)
    name=Column(String)
    price=Column(Float)
    category=Column(Enum(CategoryEnum))
    user_id=Column(Integer,ForeignKey('users.id'),nullable=False)
    image=Column(String,nullable=False)
    description=Column(String)
    quantity=Column(Integer,default=1)
    user=relationship(
        'User',
        back_populates='products'
    )
    cart_items = relationship(
    "CartItem",
    back_populates="product"
)

class CartItem(Base):
    __tablename__='cart'
    
    id=Column(Integer,primary_key=True,index=True)
    user_id=Column(Integer,ForeignKey('users.id'))
    product_id=Column(Integer,ForeignKey('Products.id'))
    quantity=Column(Integer,default=1)
    user = relationship("User", back_populates="cart_items")
    product = relationship("Product", back_populates="cart_items")