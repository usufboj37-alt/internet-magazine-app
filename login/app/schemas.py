from pydantic import BaseModel,field_validator

class LoginRequest(BaseModel):
    login:str
    password:str
    
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