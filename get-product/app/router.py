from fastapi import APIRouter, Depends,HTTPException
from app.models import Product, User, ProductLike
from sqlalchemy.orm import Session
from app.dependencies import get_current_user, get_db
from sqlalchemy import func
router = APIRouter()


@router.get("/get-product")
def get_product(id:int,db:Session=Depends(get_db),current_user:User=Depends(get_current_user)):
    
    product=db.query(Product).filter(Product.id==id).first()
    
    if not product:
        raise HTTPException(
            status_code=404,
            detail='product not found'
        )
        
    if product.is_available==False or product.quantity==0:
        raise HTTPException(
            status_code=400,
            detail='Item deleted'
        )
        
    
    is_liked=db.query(ProductLike).filter(ProductLike.product_id==id,ProductLike.user_id==current_user.id).first() is not None
    likes = (
            db.query(func.count(ProductLike.id))
            .filter(ProductLike.product_id == product.id)
            .scalar()
        )
    
    return{
        'id':product.id,
        'name':product.name,
        'price':product.price,
        'category':product.category,
        'user_id':product.user_id,
        'description':product.description,
        'image':product.image,
        'currency':product.currency,
        'is_liked':is_liked,
        'likes':likes,
        'quantity':product.quantity
    }

