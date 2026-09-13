from fastapi import APIRouter,HTTPException,Depends,Form,UploadFile,File
from sqlalchemy.orm import Session
from app.dependencies import get_db,get_current_user
from app.models import User
from app.schemas import CommentRequest
import app.repository as repository
from app.enums import CategoryEnum
router=APIRouter()

@router.post('/comment')
def add_comment(
    comment:CommentRequest,
    db:Session=Depends(get_db),
    current_user:User=Depends(get_current_user)
):
    
     
    new_comment=repository.add_comment(db,current_user,comment)
         
    return{
             'message':'comment created',
             'text':new_comment.text,
             'user_id':new_comment.user_id,
             'id':new_comment.id,
             
         }