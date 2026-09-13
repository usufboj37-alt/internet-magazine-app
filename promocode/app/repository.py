
from sqlalchemy.orm import Session
from fastapi import UploadFile,HTTPException
from app.enums import rates,TypeEnum
from app.models import User, Product,Promocode,Wallet,CartItem,WalletOperation
from app.schemas import PromocodeRequest

def buy_promocode(code:PromocodeRequest,db:Session,current_user:User):
    
    promocode=db.query(Promocode).filter(Promocode.code==code.code,Promocode.product_id==code.product_id,Promocode.is_active==True).first()
    product=db.query(Product).filter(Product.id==code.product_id).first()
    wallet=db.query(Wallet).filter(Wallet.id==code.wallet_id).first()
    cart_item=db.query(CartItem).filter(CartItem.product_id==code.product_id,CartItem.user_id==current_user.id).fisrt()
    
    if not promocode:
        raise HTTPException(
            status_code=404,
            detail='promocode does not exists'
        )
        
    
    
    
    if wallet.currency==product.currency:
        new_price = product.price * (1 - promocode.sale / 100)
        if wallet.balance<new_price:
            raise HTTPException(
                status_code=400,
                detail='not enough money'
            )
        
        
        operation=WalletOperation(wallet_id=wallet.id,amount=new_price,type=TypeEnum.BUY,currency=product.currency,user_id=current_user.id,product_id=product.id)
        wallet.balance-=new_price
        db.add(operation)
        product.is_available=False
        db.delete(cart_item)
       
        db.commit()
        db.refresh(wallet)
        return {
            'message':'product bought and deleted with same currency and promocode'
        }
    
    elif wallet.currency!=product.currency:
        rate=rates[(wallet.currency,product.currency)]
        pnew_price = product.price * (1 - promocode.sale / 100)
        new_price=pnew_price*rate
        
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
            'message':'product bought and deleted with different currency and promocode'
        }