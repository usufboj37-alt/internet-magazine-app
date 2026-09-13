from fastapi import APIRouter,HTTPException,Depends,Form,UploadFile,File,WebSocket
from sqlalchemy.orm import Session
from app.dependencies import get_db,get_current_user
from app.models import User,Message,Chat
from app.enums import CategoryEnum,CurrencyEnum


router=APIRouter()


@router.get("/chats")
def chats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    chats = (
        db.query(Chat)
        .filter(
            (Chat.user1_id == current_user.id) |
            (Chat.user2_id == current_user.id)
        )
        .all()
    )

    if not chats:
        raise HTTPException(
            status_code=404,
            detail="chats not found"
        )

    result = []

    for chat in chats:

        
        if chat.user1_id == current_user.id:
            other_user_id = chat.user2_id
        else:
            other_user_id = chat.user1_id

        other_user = (
            db.query(User)
            .filter(User.id == other_user_id)
            .first()
        )

        
        last_message = (
            db.query(Message)
            .filter(Message.chat_id == chat.id)
            .order_by(Message.created_at.desc())
            .first()
        )

        result.append({
            "id": chat.id,

            "user": {
                "id": other_user.id,
                "user_name": other_user.user_name,
                "image": other_user.image,
            },

            "last_message": (
                {
                    "id": last_message.id,
                    "text": last_message.text,
                    "sender_id": last_message.sender_id,
                    "created_at": last_message.created_at,
                }
                if last_message
                else None
            )
        })

    return result