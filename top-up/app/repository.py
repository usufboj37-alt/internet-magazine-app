
from sqlalchemy.orm import Session
from fastapi import UploadFile,HTTPException

from app.models import User, Product,Wallet,WalletOperation
from app.schemas import TopUpRequest
from app.enums import rates,TypeEnum


def top_up(tp:TopUpRequest,db:Session,current_user:User):
    
    wallet=db.query(Wallet).filter(Wallet.id==tp.wallet_id,Wallet.user_id==current_user.id).first()
    
    
    if not wallet:
        raise HTTPException(
            status_code=404,
            detail='wallet not found'
        )
    
    if wallet.currency==tp.currency:
        wallet.balance+=tp.amount
        
        operation=WalletOperation(wallet_id=wallet.id,amount=tp.amount,type=TypeEnum.TOP_UP,currency=tp.currency,user_id=current_user.id)
        db.add(operation)
        db.commit()
        db.refresh(wallet)
        return{
            'message':'amount added with same currency'
        }
    
    if wallet.currency!=tp.currency:
        rate=rates[(wallet.currency,tp.currency)]
        new_amount=tp.amount*rate
        wallet.balance+=new_amount
        operation=WalletOperation(wallet_id=wallet.id,amount=tp.amount,type=TypeEnum.TOP_UP,currency=tp.currency,user_id=current_user.id)
        db.add(operation)
        
        db.commit()
        db.refresh(wallet)
        return{
            'message':'amount added with different currency'
        }