from pydantic import BaseModel

class CommentRequest(BaseModel):
    product_id:int
    text:str