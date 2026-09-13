from sqlalchemy.orm import Session
from app.models import User,Product
from app.schemas import DeleteRequest
from fastapi import HTTPException
def delete_product(db:Session,current_user:User,delete:DeleteRequest):
    
    product=db.query(Product).filter(Product.id==delete.id,Product.user_id==current_user.id).first()
    
    if not product:
        raise HTTPException(
            status_code=404,
            detail='product not found'
        )
    
    db.delete(product)
    db.commit()
    
    return product