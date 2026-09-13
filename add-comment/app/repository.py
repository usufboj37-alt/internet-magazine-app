from sqlalchemy.orm import Session
from fastapi import UploadFile

from app.models import User, Comment
from app.schemas import CommentRequest

def add_comment(db:Session,current_user:User,comment:CommentRequest):
    
    user=db.query(User).filter(User.id==current_user.id).first()
    
    new_comment=Comment(product_id=comment.product_id,user_id=current_user.id,text=comment.text,user_name=user.user_name,image=user.image)
    
    db.add(new_comment)
    db.commit()
    
    return new_comment