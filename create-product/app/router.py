from fastapi import APIRouter,HTTPException,Depends,Form,UploadFile,File
from sqlalchemy.orm import Session
from app.dependencies import get_db,get_current_user
from app.models import User
from app.schemas import ProductRequest
import app.repository as repository
from app.enums import CategoryEnum,CurrencyEnum
router=APIRouter()

@router.post('/create-product')
def create_product(name: str = Form(...),
    price: int = Form(...),
    category: CategoryEnum = Form(...),
    description:str=Form(...),
    image: UploadFile = File(...),
    currency:CurrencyEnum=Form(...),
    quantity:int=Form(...),
    db:Session=Depends(get_db),current_user:User=Depends(get_current_user)
):
    Product = ProductRequest(
        name=name,
        price=price,
        category=category,
        description=description,
        currency=currency,
        quantity=quantity)
     
    new_product=repository.create_product(db,current_user,Product,image)
         
    return{
             'message':'Product created',
             'name':new_product.name,
             'price':new_product.price,
             'category':new_product.category,
             'description':new_product.description,
             'currency':new_product.currency,
             'user_id':new_product.user_id,
             'id':new_product.id,
             'likes':0
         }