from fastapi import APIRouter,HTTPException,Depends,Form,UploadFile,File
from sqlalchemy.orm import Session
from app.dependencies import get_db,get_current_user
from app.models import User
from app.schemas import TopUpRequest
import app.repository as repository
from app.enums import CategoryEnum,CurrencyEnum

router=APIRouter()

@router.post('/top-up')
def top_up(tp:TopUpRequest,db:Session=Depends(get_db),current_user:User=Depends(get_current_user)):
    
    message=repository.top_up(tp,db,current_user)
    
    return message