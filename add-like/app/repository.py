from sqlalchemy.orm import Session
from app.models import User, Product,ProductLike
from app.schemas import LikeRequest
from fastapi import HTTPException

def AddLike(db:Session,current_user:User,product_id:LikeRequest):
    
    product=db.query(Product).filter(Product.id==product_id.product_id).first()
    
    if not product:
        raise HTTPException(
            status_code=404,
            detail='product not found'
        )
    
    like=db.query(ProductLike).filter(ProductLike.user_id==current_user.id).first()
    
    if like:
        db.delete(like)
        db.commit()
        return 'like deleted'
    
    new_like=ProductLike(product_id=product_id.product_id,user_id=current_user.id)
    
    db.add(new_like)
    db.commit()
    
    return 'like added'