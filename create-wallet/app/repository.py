from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models import User, Wallet
from app.schemas import WalletRequest

def create_wallet(wallet:WalletRequest,db:Session,current_user:User):
    
    old_wallet=db.query(Wallet).filter(Wallet.wallet_name==wallet.wallet_name,Wallet.user_id==current_user.id).first()
    
    if old_wallet:
        raise HTTPException(
            status_code=400,
            detail='wallet already exists'
        )
    
    new_wallet=Wallet(user_id=current_user.id,wallet_name=wallet.wallet_name,balance=wallet.balance,currency=wallet.currency)
    
    db.add(new_wallet)
    db.commit()
    
    return new_wallet