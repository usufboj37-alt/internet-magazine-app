from pydantic import BaseModel,field_validator
from app.enums import CategoryEnum,CurrencyEnum
from fastapi import UploadFile
class ProductRequest(BaseModel):
    name:str
    price:int
    category:CategoryEnum
    description:str
    currency:CurrencyEnum=CurrencyEnum.RUB
    quantity:int
    
    
    @field_validator('name')
    def name_not_none(cls,value):
        if not value:
            raise ValueError('Product name can not be none')
        return value
    @field_validator('description')
    def description_not_none(cls,value):
            if not value:
                raise ValueError('Description can not be none')
            return value
    @field_validator('price')
    def price_not_negative(cls,value):
        if value<0:
            raise ValueError('Price can not be Negative')
        
        if not value:
            raise ValueError('Price can not be None')
        
        return value
    
    @field_validator('category')
    def category_not_none(cls,value):
        if not value:
            raise ValueError('Category can not be none')
        return value

    @field_validator('currency')
    def currency_not_none(cls,value):
        if not value:
            raise ValueError('currency can not be none')
        return value