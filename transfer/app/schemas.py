from pydantic import BaseModel,field_validator
from app.enums import CategoryEnum,CurrencyEnum

class TransferRequest(BaseModel):
    from_wallet_id:int
    to_wallet_id:int
    amount:float
    
