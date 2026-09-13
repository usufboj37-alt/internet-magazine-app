from fastapi import APIRouter,Depends,HTTPException
from app.dependencies import get_current_user,get_db
from app.models import User,Product,CartItem
from sqlalchemy.orm import Session

router=APIRouter()

@router.get('/cart')
def get_cart(db:Session=Depends(get_db),current_user:User=Depends(get_current_user)):
    
    cart=db.query(CartItem).filter(CartItem.user_id==current_user.id).all()
    
    if not cart:
        raise HTTPException(
            status_code=404,
            detail='Cart items not found'
        )
    
    return[{
        'product_id':Item.product.id,
        'name':Item.product.name,
        'price':Item.product.price,
        'category':Item.product.category,
        'image':Item.product.image,
        'quantity':Item.quantity,
        'description':Item.product.description,
        
    }for Item in cart] 