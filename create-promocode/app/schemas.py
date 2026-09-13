from pydantic import BaseModel,field_validator
from app.enums import CategoryEnum,CurrencyEnum
from fastapi import UploadFile

class PromocodeRequest(BaseModel):
    code:str
    sale:int
    product_id:int
    
    @field_validator('sale')
    def sale_not_negative(cls,value):
        if value<0:
            raise ValueError('sale can not be Negative')
        
        if not value:
            raise ValueError('sale can not be None')
        
        return value
    
    @field_validator('code')
    def code_not_none(cls,value):
        if not value:
            raise ValueError('code can not be none')
        return value
    
    