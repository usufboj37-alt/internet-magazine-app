from fastapi import APIRouter,HTTPException,Depends,Form,UploadFile,File
from sqlalchemy.orm import Session
from app.dependencies import get_db,get_current_user
from app.models import User
from app.schemas import PromocodeRequest
import app.repository as repository
from app.enums import CategoryEnum,CurrencyEnum

router=APIRouter()

@router.post('/create-promocode')
def create_promocode(promocode:PromocodeRequest,db:Session=Depends(get_db),current_user:User=Depends(get_current_user)):
    
    new_promocode=repository.create_promocode(promocode,db,current_user)
    
    return{
        "message":"promocode created"
    }