from fastapi import APIRouter
from fastapi.responses import JSONResponse
from app.security import security
router=APIRouter()

@router.post('/logout')
def logout():
    response = JSONResponse({
        "message": "you successfully logout"
    })

    security.unset_access_cookies(response)
    security.unset_refresh_cookies(response)
                
    return response