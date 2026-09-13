from sqlalchemy.orm import Session
from app.models import User
from app.schemas import UserRequest
from fastapi import HTTPException,UploadFile
import os
import shutil
import uuid

UPLOAD_DIR = "acc-uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


def create_user(db:Session,user:UserRequest,image:UploadFile):
    
    old_user=db.query(User).filter(User.password==user.password,User.login==user.login).first()
    
    filename = f"{uuid.uuid4()}_{image.filename}"
    filepath = os.path.join(UPLOAD_DIR, filename)

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    
    if old_user:
        raise HTTPException(
            status_code=400,
            detail='user already exist'
        )
    
    new_user=User(login=user.login,password=user.password,user_name=user.user_name,image=filepath)
    
    db.add(new_user)
    db.commit()
    
    return new_user