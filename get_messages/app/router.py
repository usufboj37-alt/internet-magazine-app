from fastapi import APIRouter,HTTPException,Depends,Form,UploadFile,File,WebSocket
from sqlalchemy.orm import Session
from app.dependencies import get_db,get_current_user
from app.models import User,Message
from app.enums import CategoryEnum,CurrencyEnum
from zoneinfo import ZoneInfo

router=APIRouter()


@router.get('/messages')
def get_messages(
    chat_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    messages = db.query(Message).filter(Message.chat_id == chat_id).all()

    if not messages:
        raise HTTPException(
            status_code=404,
            detail='messages not found'
        )
        
    tashkent = ZoneInfo("Asia/Tashkent")
    
    

    return [
    {
        **{
            key: value
            for key, value in message.__dict__.items()
            if key != "_sa_instance_state"
        },
        "formatted_time": message.created_at.astimezone(tashkent).strftime("%H:%M")
        
    }
    for message in messages
]