from fastapi import APIRouter,HTTPException,Depends,Form,UploadFile,File
from sqlalchemy.orm import Session
from app.dependencies import get_db,get_current_user
from app.models import User
from app.schemas import LikeRequest
import app.repository as repository
from app.enums import CategoryEnum


router=APIRouter()

@router.post('/like')
def add_like(product_id:LikeRequest,db:Session=Depends(get_db),current_user:User=Depends(get_current_user)):
    
    message=repository.AddLike(db,current_user,product_id)
    
    return message