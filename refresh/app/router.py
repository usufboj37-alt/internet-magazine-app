from fastapi import APIRouter, Response, Depends, HTTPException
from authx.exceptions import MissingTokenError
from app.security import security
router = APIRouter()

@router.post("/refresh")
def refresh(
    response: Response,
    token=Depends(security.refresh_token_required)
):
    try:
        current_user = token.sub

        new_access_token = security.create_access_token(
            uid=current_user
        )

        security.set_access_cookies(
            new_access_token,
            response
        )

        response.status_code = 200
        response.body = b'{"msg":"ok"}'
        response.media_type = "application/json"

        return response

    except MissingTokenError:
        raise HTTPException(
            status_code=401,
            detail="Invalid refresh token"
        )