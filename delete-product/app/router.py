from fastapi import APIRouter,Depends
from app.dependencies import get_current_user,get_db
from sqlalchemy.orm import Session
from app.models import User
from app.schemas import DeleteRequest
import app.repository as repository
router=APIRouter()

@router.delete('/delete')
def delete_product(product:DeleteRequest,db:Session=Depends(get_db),current_user:User=Depends(get_current_user)):
    
    del_product=repository.delete_product(db,current_user,product)
    
    return{
        'message':'product deleted',
        'id':del_product.id
    }