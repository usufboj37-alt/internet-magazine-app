from pydantic import BaseModel

class UpdateRequest(BaseModel):
    new_login:str | None=None
    new_password:str | None=None
    new_user_name:str | None=None