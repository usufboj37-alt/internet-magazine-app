from app.database import SessionLocal
from sqlalchemy.orm import Session
from fastapi import Depends,HTTPException
from authx import RequestToken
from app.models import User
def get_db():
    db=SessionLocal()
    
    try:
        yield db
    finally:
        db.close()
        

