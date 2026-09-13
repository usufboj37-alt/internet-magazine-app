from fastapi import APIRouter,HTTPException,Depends,Form,UploadFile,File
from sqlalchemy.orm import Session
from app.dependencies import get_db,get_current_user
from app.models import User,Comment

router=APIRouter()

@router.get('/comments')
def get_comments(product_id:int,db:Session=Depends(get_db),current_user:User=Depends(get_current_user)):
    
    comments=db.query(Comment).filter(Comment.product_id==product_id).all()
    
    if not comments:
        raise HTTPException(
            status_code=404,
            detail='comments not found'
        )
    
    return comments