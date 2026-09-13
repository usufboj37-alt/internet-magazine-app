from fastapi import HTTPException
from sqlalchemy.orm import Session
from fastapi import UploadFile
from app.models import User, Product,Wallet,WalletOperation,CartItem
from app.schemas import BuyRequest
from app.enums import rates,TypeEnum
def buy(buy:BuyRequest,db:Session,current_user:User):
    
    wallet=db.query(Wallet).filter(Wallet.wallet_name==buy.wallet_name,Wallet.user_id==current_user.id).first()
    product=db.query(Product).filter(Product.id==buy.product_id).first()
    cart_item=db.query(CartItem).filter(CartItem.product_id==product.id,CartItem.user_id==current_user.id).first()
    
    if not wallet:
        raise HTTPException(
            status_code=404,
            detail='wallet not found'
        )
    if not product:
            raise HTTPException(
                status_code=404,
                detail='product not found'
            )
            
    
    if wallet.currency==product.currency:
        if wallet.balance<product.price:
            raise HTTPException(
                status_code=400,
                detail='not enough money'
            )
        operation=WalletOperation(wallet_id=wallet.id,amount=product.price,type=TypeEnum.BUY,currency=product.currency,user_id=current_user.id,product_id=product.id)
        wallet.balance-=product.price
        db.add(operation)
        product.is_available=False
        db.delete(cart_item)
       
        db.commit()
        db.refresh(wallet)
        return {
            'message':'product bought and deleted with same currency'
        }
    
    elif wallet.currency!=product.currency:
        rate=rates[(wallet.currency,product.currency)]
        new_price=product.price*rate
        
        if wallet.balance<new_price:
            raise HTTPException(
                status_code=400,
                detail='not enough money'
            )
        operation=WalletOperation(wallet_id=wallet.id,amount=product.price,type=TypeEnum.BUY,currency=product.currency,user_id=current_user.id,product_id=product.id)
        wallet.balance-=new_price
        db.add(operation)
        product.is_available=False
        db.delete(cart_item)
        db.commit()
        db.refresh(wallet)
        return{
            'message':'product bought and deleted with different currency'
        }