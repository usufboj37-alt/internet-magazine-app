from pydantic import BaseModel,field_validator

class UserRequest(BaseModel):
    login:str
    password:str
    user_name:str
    
    
    @field_validator('login')
    def login_not_none(cls,value):
        if not value:
            raise ValueError('login can not be none')
        return value
    @field_validator('password')
    def password_not_none(cls,value):
        if not value:
            raise ValueError('password can not be none')
        return value