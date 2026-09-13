from pydantic import BaseModel,field_validator
from app.enums import CurrencyEnum
class WalletRequest(BaseModel):
    wallet_name:str
    balance:float
    currency:CurrencyEnum=CurrencyEnum.RUB
    
    @field_validator('wallet_name')
    def name_not_none(cls,value):
        if not value:
            raise ValueError('Wallet name can not be none')
        return value
    @field_validator('currency')
    def currency_not_none(cls,value):
            if not value:
                raise ValueError('currency can not be none')
            return value
    @field_validator('balance')
    def balance_not_negative(cls,value):
        if value<0:
            raise ValueError('balance can not be Negative')
        
        if not value:
            raise ValueError('balance can not be None')
        
        return value
