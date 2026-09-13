from pydantic import BaseModel,ConfigDict
from app.enums import CurrencyEnum,CategoryEnum
class ProductResponse(BaseModel):
    id: int
    name: str
    price: float
    description: str
    image: str
    likes: int
    is_liked: bool
    user_id:int
    currency:CurrencyEnum
    category:CategoryEnum
    quantity:int

    model_config = ConfigDict(from_attributes=True)
    
class UserId(BaseModel):
    user_id:int