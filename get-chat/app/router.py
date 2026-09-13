from fastapi import APIRouter,HTTPException,Depends,Form,UploadFile,File,WebSocket
from sqlalchemy.orm import Session
from app.dependencies import get_db,get_current_user
from app.models import User,Message,Chat
from app.enums import CategoryEnum,CurrencyEnum


router=APIRouter()


@router.get('/get-chat')
def get_chat(seller_id:int,db:Session=Depends(get_db),current_user:User=Depends(get_current_user)):
    
    buyer_id=current_user.id
    
    old_chat=db.query(Chat).filter((
        (Chat.user1_id==buyer_id)&
        (Chat.user2_id==seller_id)) 
        | 
        (
        (Chat.user1_id == seller_id) &
        (Chat.user2_id == buyer_id))
        ).first()
    
    if old_chat:
        return old_chat
    
    chat=Chat(user1_id=buyer_id,user2_id=seller_id)
    db.add(chat)
    db.commit()
    return chat