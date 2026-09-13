from fastapi import APIRouter,HTTPException,Depends,Form,UploadFile,File
from sqlalchemy.orm import Session
from app.dependencies import get_db,get_current_user
from app.models import User
from app.schemas import  WalletRequest
import app.repository as repository
from app.enums import CategoryEnum,CurrencyEnum

router=APIRouter()


@router.post('/create-wallet')
def create_wallet(wallet:WalletRequest,db:Session=Depends(get_db),current_user:User=Depends(get_current_user)):
    
    new_wallet=repository.create_wallet(wallet,db,current_user)
    
    return{
        'message':'wallet created'
    }

