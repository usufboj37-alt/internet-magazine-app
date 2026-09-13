from pydantic import BaseModel,field_validator
from app.enums import CategoryEnum,CurrencyEnum
from fastapi import UploadFile

class PromocodeRequest(BaseModel):
    code:str
    product_id:int
    wallet_id:int
    @field_validator('code')
    def code_not_none(cls,value):
        if not value:
            raise ValueError('code can not be none')
        return value
    
    