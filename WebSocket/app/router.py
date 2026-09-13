from fastapi import APIRouter, WebSocket
from sqlalchemy.orm import Session
from jwt import decode, InvalidTokenError

from app.dependencies import get_db
from app.models import User, Message
from zoneinfo import ZoneInfo

tashkent = ZoneInfo("Asia/Tashkent")
router = APIRouter()

connections: dict[int, WebSocket] = {}

SECRET_KEY = "YSF_SUPER_MEGA_ULTRA_GIGA_SECRET_ACCESS_TOKEN_SECRET_KEY"
ALGORITHM = "HS256"
COOKIE_NAME = "YSF_JWT_TOKEN_COOKIE"


def get_user_from_cookie(
    token: str,
    db: Session
) -> User | None:

    try:
        payload = decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        user_jwt_id = int(payload["sub"])

    except (InvalidTokenError, KeyError, ValueError, TypeError):
        return None

    current_user = (
        db.query(User)
        .filter(User.id == user_jwt_id)
        .first()
    )

    return current_user


@router.websocket("/ws")
async def websocket(websocket: WebSocket):

    token = websocket.cookies.get(COOKIE_NAME)

    if not token:
        await websocket.close(code=1008)
        return

    db = next(get_db())
    current_user = None

    try:
        current_user = get_user_from_cookie(token, db)

        if not current_user:
            await websocket.close(code=1008)
            return

        await websocket.accept()

        connections[current_user.id] = websocket

        while True:

            data = await websocket.receive_json()

            chat_id = data["chat_id"]
            text = data["text"]
            receiver_id = data["receiver_id"]

            message = Message(
                sender_id=current_user.id,
                chat_id=chat_id,
                text=text,
            )

            db.add(message)
            db.commit()
            db.refresh(message)
            
            formatted_time=message.created_at.astimezone(tashkent).strftime("%H:%M")

            message_data = {
                "id": message.id,
                "chat_id": message.chat_id,
                "sender_id": message.sender_id,
                "text": message.text,
                "created_at": message.created_at.isoformat(),
                "formatted_time":formatted_time
            }

            
            receiver_socket = connections.get(receiver_id)

            if receiver_socket:
                await receiver_socket.send_json(message_data)

            
            await websocket.send_json(message_data)

    except Exception as e:
        print("WebSocket error:", e)

    finally:

        if current_user:
            connections.pop(current_user.id, None)

        db.close()