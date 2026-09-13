from pydantic import BaseModel,field_validator

class LikeRequest(BaseModel):
    product_id:int
    
    @field_validator('product_id')
    def id_not_none(cls,value):
        if not value:
            raise ValueError('product id can not be none')
        return value
    