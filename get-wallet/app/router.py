from fastapi import APIRouter,HTTPException,Depends,Form,UploadFile,File
from sqlalchemy.orm import Session
from app.dependencies import get_db,get_current_user
from app.models import User,Wallet
from app.enums import CategoryEnum,CurrencyEnum

router=APIRouter()

@router.get('/wallet')
def get_wallet(wallet_id:int,db:Session=Depends(get_db),current_user:User=Depends(get_current_user)):
    
    wallet=db.query(Wallet).filter(Wallet.id==wallet_id,Wallet.user_id==current_user.id).first()
    
    if not wallet:
        raise HTTPException(
            status_code=404,
            detail='wallet not found'
        )
    return wallet