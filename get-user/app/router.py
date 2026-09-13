from fastapi import APIRouter,Depends,HTTPException
from app.models import User
from app.dependencies import get_current_user,get_db
from sqlalchemy.orm import Session
from app.schemas import Id
router=APIRouter()

@router.get('/get_user')
def get_user(db:Session=Depends(get_db),current_user:User=Depends(get_current_user)):
    
    user=db.query(User).filter(User.id==current_user.id).first()
    
    if user:
        return user
    if not user:
        return False
    

@router.post('/get-user')
def get_user(user_id:Id,db:Session=Depends(get_db),current_user:User=Depends(get_current_user)):
    
    user=db.query(User).filter(User.id==user_id.user_id).first()
    
    if not user:
        raise HTTPException(
            status_code=404,
            detail='user not found'
        )
        
    return user