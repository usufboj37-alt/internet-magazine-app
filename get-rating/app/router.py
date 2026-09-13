from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from app.dependencies import get_current_user,get_db
from app.models import Rating,User,Product
from sqlalchemy import func
router=APIRouter()




@router.post('/rating')
def get_rating(id:int,db:Session=Depends(get_db),current_user:User=Depends(get_current_user)):
    
    product=db.query(Product).filter(Product.id==id).first()
    
    if not product:
        raise HTTPException(
            status_code=404,
            detail='product not found'
        )
    rating = db.query(func.avg(Rating.value)).filter(Rating.product_id == id).scalar()
    
    if rating is not None:
        rating = round(float(rating), 1)
    
    if not rating:
        rating=0
    
    
    
    count = db.query(func.count(Rating.id)).filter(
    Rating.product_id == id
).scalar()
    
    if not rating:
        raise HTTPException(
            status_code=404,
            detail='rating not found'
        )
    
    return{
        'rating':rating,
        'product_id':product.id,
        'count':count
    }