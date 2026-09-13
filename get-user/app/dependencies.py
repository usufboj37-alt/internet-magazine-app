from app.database import SessionLocal
from app.security import security
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
        
def get_current_user(db:Session=Depends(get_db),token:RequestToken=Depends(security.access_token_required)):
    user_jwt_id=int(token.sub)
    
    current_user=db.query(User).filter(User.id==user_jwt_id).first()
    
    if not current_user:
        raise HTTPException(
            status_code=401,
            detail='Unauthorized'
        )
    
    return current_user
