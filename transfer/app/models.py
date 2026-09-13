from sqlalchemy.orm import DeclarativeBase, relationship
from sqlalchemy import (
    Column,
    String,
    Integer,
    Float,
    Enum,
    ForeignKey,
    UniqueConstraint,
)

from app.enums import CategoryEnum, CurrencyEnum,TypeEnum


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    login = Column(String)
    password = Column(String)
    user_name = Column(String)
    image = Column(String, nullable=False)

    products = relationship(
        "Product",
        back_populates="user",
        cascade="all, delete-orphan",
    )

    cart_items = relationship(
        "CartItem",
        back_populates="user",
        cascade="all, delete-orphan",
    )


class Product(Base):
    __tablename__ = "Products"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    price = Column(Float)
    category = Column(Enum(CategoryEnum))
    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )
    description = Column(String)
    image = Column(String, nullable=False)
    currency = Column(Enum(CurrencyEnum))

    user = relationship(
        "User",
        back_populates="products",
    )

    cart_items = relationship(
        "CartItem",
        back_populates="product",
        passive_deletes=True,
    )

    ratings = relationship(
        "Rating",
        back_populates="product",
        passive_deletes=True,
    )

    likes = relationship(
        "ProductLike",
        back_populates="product",
        passive_deletes=True,
    )

    comments = relationship(
        "Comment",
        back_populates="product",
        passive_deletes=True,
    )


class CartItem(Base):
    __tablename__ = "cart"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    product_id = Column(
        Integer,
        ForeignKey(
            "Products.id",
            ondelete="CASCADE",
        ),
        nullable=False,
    )

    quantity = Column(
        Integer,
        default=1,
        nullable=False,
    )

    user = relationship(
        "User",
        back_populates="cart_items",
    )

    product = relationship(
        "Product",
        back_populates="cart_items",
    )


class Rating(Base):
    __tablename__ = "rating"

    id = Column(
        Integer,
        primary_key=True,
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    value = Column(
        Float,
        nullable=False,
    )

    product_id = Column(
        Integer,
        ForeignKey(
            "Products.id",
            ondelete="CASCADE",
        ),
        nullable=False,
    )

    user = relationship("User")

    product = relationship(
        "Product",
        back_populates="ratings",
    )


class ProductLike(Base):
    __tablename__ = "likes"

    id = Column(
        Integer,
        primary_key=True,
    )

    product_id = Column(
        Integer,
        ForeignKey(
            "Products.id",
            ondelete="CASCADE",
        ),
        nullable=False,
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    user = relationship("User")

    product = relationship(
        "Product",
        back_populates="likes",
    )

    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "product_id",
        ),
    )


class Comment(Base):
    __tablename__ = "comments"

    id = Column(
        Integer,
        primary_key=True,
    )

    product_id = Column(
        Integer,
        ForeignKey(
            "Products.id",
            ondelete="CASCADE",
        ),
        nullable=False,
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    text = Column(
        String,
        nullable=False,
    )

    image = Column(String)

    user_name = Column(String)

    product = relationship(
        "Product",
        back_populates="comments",
    )


class Wallet(Base):
    __tablename__ = "wallet"

    id = Column(
        Integer,
        primary_key=True,
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    wallet_name = Column(String)

    balance = Column(Float)

    currency = Column(Enum(CurrencyEnum))
    
class WalletOperation(Base):
    __tablename__='walletoperation'
    
    id=Column(Integer,primary_key=True)
    wallet_id=Column(Integer,ForeignKey('wallet.id'))
    amount=Column(Float)
    type=Column(Enum(TypeEnum))
    currency=Column(Enum(CurrencyEnum))
    product_id = Column(
        Integer,
        ForeignKey("Products.id", ondelete="SET NULL"),
        nullable=True
    )
    user_id = Column(
            Integer,
            ForeignKey("users.id"),
            nullable=False,
        )