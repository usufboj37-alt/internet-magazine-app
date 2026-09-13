from fastapi import APIRouter,HTTPException,Depends,Form,UploadFile,File
from sqlalchemy.orm import Session
from app.dependencies import get_db,get_current_user
from app.models import User,Wallet,WalletOperation
from app.enums import CategoryEnum,CurrencyEnum

router=APIRouter()

@router.get('/operations')
def get_operations(wallet_id:int,db:Session=Depends(get_db),current_user:User=Depends(get_current_user)):
    
    operations=db.query(WalletOperation).filter(WalletOperation.wallet_id==wallet_id).all()
    
    if not operations:
        raise HTTPException(
            status_code=404,
            detail='operations not found'
        )
    
    return operations