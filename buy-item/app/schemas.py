from pydantic import BaseModel,field_validator
from app.enums import CategoryEnum,CurrencyEnum
from fastapi import UploadFile


class BuyRequest(BaseModel):
    wallet_name:str
    product_id:int