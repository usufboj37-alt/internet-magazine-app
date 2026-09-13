from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from app.dependencies import get_current_user,get_db
from app.models import User,Product,Rating

router=APIRouter()

@router.post('/add-rating')
def add_rating(rating:int,product_id:int,db:Session=Depends(get_db),current_user:User=Depends(get_current_user)):
    
    old_rating=db.query(Rating).filter(Rating.product_id==product_id,Rating.user_id==current_user.id).first()
    product=db.query(Product).filter(Product.id==product_id).first()
    
    if not product:
        raise HTTPException(
            status_code=404,
            detail='product not found'
        )
    
    if old_rating:
        old_rating.value=rating
        db.commit()
        db.refresh(old_rating)
        return{
            'message':'new rating added'
        }
    if rating<1 or rating>5:
        raise HTTPException(
            status_code=400,
            detail='rating must be in deaposon 1-5'
        )
    
    new_rating=Rating(user_id=current_user.id,product_id=product_id,value=rating)
    
    db.add(new_rating)
    db.commit()
    
    return{
        "message":"rating added",
        "product_id":new_rating.product_id,
        "value":new_rating.value,
        "user_id":new_rating.user_id
    }