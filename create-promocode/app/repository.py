
from sqlalchemy.orm import Session
from fastapi import UploadFile,HTTPException

from app.models import User, Product,Promocode
from app.schemas import PromocodeRequest

def create_promocode(promocode:PromocodeRequest,db:Session,current_user:User):
    
    old_promocode=db.query(Promocode).filter(Promocode.code==promocode.code,Promocode.sale==promocode.sale).first()
    
    if old_promocode:
        raise HTTPException(
            status_code=400,
            detail='promocode already exists'
        )
        
    new_promocode=Promocode(code=promocode.code,sale=promocode.sale,product_id=promocode.product_id)
    db.add(new_promocode)
    db.commit()
    
    return new_promocode