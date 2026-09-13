from fastapi import APIRouter,Depends,HTTPException
from app.dependencies import get_current_user,get_db
from sqlalchemy.orm import Session
from app.schemas import AddRequest
from app.models import User,Product,CartItem

router=APIRouter()

@router.post('/add-cart')
def add_to_cart(product_id:AddRequest,db:Session=Depends(get_db),current_user:User=Depends(get_current_user)):
    
    product=db.query(Product).filter(Product.id==product_id.product_id).first()
    
    cart=db.query(CartItem).filter(CartItem.product_id==product_id.product_id,CartItem.user_id==current_user.id).first()
    
    if product.quantity<=0:
        raise HTTPException(
            status_code=400,
            detail='there is no product remain'
        )
    
    if cart:
        cart.quantity+=1
        product.quantity-=1
        db.commit()
        db.refresh(cart)
        db.refresh(product)
        return{
            'message':'quantity increased'
        }
    
    new_cart=CartItem(user_id=current_user.id,product_id=product.id,quantity=1)
    product.quantity-=1
    
    db.add(new_cart)
    db.commit()
    
    return{
        'message':'new item added to cart',
        'product_id':new_cart.product_id,
        'user_id':current_user.id
    }