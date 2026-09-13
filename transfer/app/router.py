from fastapi import APIRouter,HTTPException,Depends,Form,UploadFile,File
from sqlalchemy.orm import Session
from app.dependencies import get_db,get_current_user
from app.models import User
from app.schemas import TransferRequest
import app.repository as repository
from app.enums import CategoryEnum,CurrencyEnum
router=APIRouter()

@router.post('/transfer')
def transfer(transfer:TransferRequest,db:Session=Depends(get_db),current_user:User=Depends(get_current_user)):
    
    message=repository.transfer(transfer,db,current_user)
    
    return message