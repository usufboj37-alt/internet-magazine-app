from fastapi import APIRouter,HTTPException,Depends,Form,UploadFile,File
from sqlalchemy.orm import Session
from app.dependencies import get_db,get_current_user
from app.models import User,WalletOperation
from app.enums import CategoryEnum,CurrencyEnum

router=APIRouter()

@router.get('/user-operations')
def get_user_operations(db:Session=Depends(get_db),current_user:User=Depends(get_current_user)):
    
    operations=db.query(WalletOperation).filter(WalletOperation.user_id==current_user.id).all()
    
    if not operations:
        raise HTTPException(
            status_code=404,
            detail='operations not found'
        )
    
    return operations