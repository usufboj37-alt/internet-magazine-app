from pydantic import BaseModel,field_validator
from app.enums import CategoryEnum,CurrencyEnum
from fastapi import UploadFile

class TopUpRequest(BaseModel):
    wallet_id:int
    amount:float
    currency:CurrencyEnum