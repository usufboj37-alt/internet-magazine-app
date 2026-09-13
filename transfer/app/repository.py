from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models import User, Product,Wallet,WalletOperation
from app.schemas import TransferRequest
from app.enums import rates,TypeEnum


def transfer(transfer:TransferRequest,db:Session,current_user:User):
    
    from_wallet=db.query(Wallet).filter(Wallet.id==transfer.from_wallet_id,Wallet.user_id==current_user.id).first()
    to_wallet=db.query(Wallet).filter(Wallet.id==transfer.to_wallet_id,Wallet.user_id==current_user.id).first()
    
    if not from_wallet or not to_wallet:
        raise HTTPException(
            status_code=404,
            detail='wallet not found'
        )
    
    if from_wallet.currency==to_wallet.currency:
        from_wallet.balance-=transfer.amount
        to_wallet.balance+=transfer.amount
        operation=WalletOperation(wallet_id=transfer.from_wallet_id,type=TypeEnum.FROM_TRANSFER,amount=transfer.amount,currency=from_wallet.currency,user_id=current_user.id)
        operation2=WalletOperation(wallet_id=transfer.to_wallet_id,type=TypeEnum.TRANSFER,amount=transfer.amount,currency=to_wallet.currency,user_id=current_user.id)
        db.add(operation)
        db.add(operation2)
        db.commit()
        db.refresh(from_wallet)
        db.refresh(to_wallet)
        return{
            'message':'transfer completed with same currencies',
            'amount':transfer.amount
        }
    
    if from_wallet.currency!=to_wallet.currency:
        rate=rates[(to_wallet.currency,from_wallet.currency)]
        new_amount=transfer.amount*rate
        from_wallet.balance-=transfer.amount
        to_wallet.balance+=new_amount
        operation=WalletOperation(wallet_id=transfer.from_wallet_id,type=TypeEnum.FROM_TRANSFER,amount=transfer.amount,currency=from_wallet.currency,user_id=current_user.id)
        operation2=WalletOperation(wallet_id=transfer.to_wallet_id,type=TypeEnum.TRANSFER,amount=new_amount,currency=from_wallet.currency,user_id=current_user.id)
        db.add(operation)
        db.add(operation2)
        db.commit()
        db.refresh(from_wallet)
        db.refresh(to_wallet)
        return{
            'message':'transfer completed with different currencies',
            'new_amount':new_amount
        }