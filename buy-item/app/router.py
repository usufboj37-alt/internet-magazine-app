from fastapi import APIRouter,HTTPException,Depends,Form,UploadFile,File
from sqlalchemy.orm import Session
from app.dependencies import get_db,get_current_user
from app.models import User
from app.schemas import BuyRequest
import app.repository as repository
from app.enums import CategoryEnum,CurrencyEnum
router=APIRouter()

@router.post('/buy')
def buy(buy:BuyRequest,db:Session=Depends(get_db),current_user:User=Depends(get_current_user)):
    
    message=repository.buy(buy,db,current_user)
    
    return message