from pydantic import BaseModel,field_validator

class DeleteRequest(BaseModel):
    id:int
    
    @field_validator('id')
    def id_not_none(cls,value):
        if not value:
            raise ValueError('id can not be none')
        return value