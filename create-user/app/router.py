from fastapi import APIRouter,Depends,UploadFile,Form,File
from app.dependencies import get_db
from sqlalchemy.orm import Session
from app.schemas import UserRequest
import app.repository as repository
router=APIRouter()

@router.post('/create-user')
def create_user(login:str=Form(...),password:str=Form(...),user_name:str=Form(...),image:UploadFile=File(...),db:Session=Depends(get_db)):
    
    user=UserRequest(login=login,password=password,user_name=user_name)
    
    new_user=repository.create_user(db,user,image)
    
    return{
        'message':'user created',
        'login':new_user.login,
        'id':new_user.id
    }