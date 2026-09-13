from fastapi import APIRouter,Depends,HTTPException
from app.dependencies import get_db
from sqlalchemy.orm import Session
from app.schemas import LoginRequest
from app.models import User
from app.security import security
from fastapi.responses import Response
router=APIRouter()

@router.post('/login')
def login(login:LoginRequest,response:Response,db:Session=Depends(get_db)):
    
    user=db.query(User).filter(User.login==login.login,User.password==login.password).first()
    
    if not user:
        raise HTTPException(
            status_code=401,
            detail='unauthorized'
        )
    
    access_token = security.create_access_token(
                    uid=str(user.id),
                    data={
                        "login":user.login
                    }
                )
                
    refresh_token=security.create_refresh_token(
                    uid=str(user.id),
                    data={
                        "login":user.login
                    }
                )

    security.set_access_cookies(access_token,response)
    security.set_refresh_cookies(refresh_token,response)
    
    return{
        'message':'success'
    }