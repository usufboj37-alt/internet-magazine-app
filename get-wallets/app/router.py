from fastapi import APIRouter,HTTPException,Depends,Form,UploadFile,File
from sqlalchemy.orm import Session
from app.dependencies import get_db,get_current_user
from app.models import User,Wallet
from app.enums import CategoryEnum,CurrencyEnum

router=APIRouter()

@router.get('/wallets')
def get_wallets(db:Session=Depends(get_db),current_user:User=Depends(get_current_user)):
    
    wallets=db.query(Wallet).filter(Wallet.user_id==current_user.id).all()
    
    if not wallets:
        raise HTTPException(
            status_code=404,
            detail='wallets not found'
        )
    
    return wallets