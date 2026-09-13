from fastapi import APIRouter,HTTPException,Depends,Form,UploadFile,File
from sqlalchemy.orm import Session
from app.dependencies import get_db,get_current_user
from app.models import User
from app.schemas import UpdateRequest
from app.enums import CategoryEnum
router=APIRouter()

@router.patch('/update')
def update_user(new_user:UpdateRequest,db:Session=Depends(get_db),current_user:User=Depends(get_current_user)):
    
    user=db.query(User).filter(User.id==current_user.id).first()
    
    changed=False
    
    if new_user.new_login is not None:
        user.login=new_user.new_login
        changed=True
       
        
        
    if new_user.new_user_name is not None:
        user.user_name=new_user.new_user_name
        changed=True
    
    
    if new_user.new_password is not None:
        user.password=new_user.new_password
        changed=True
        
    if not changed:
        return{
            'message':'nothing changed'
        }
        
    db.commit()
    db.refresh(user)
    
    return{
        'message':'user changed',
    }