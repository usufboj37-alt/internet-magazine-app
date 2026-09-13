from fastapi import APIRouter, Depends
from app.models import Product, User, ProductLike
from sqlalchemy.orm import Session
from app.dependencies import get_current_user, get_db
from sqlalchemy import func
from app.schemas import ProductResponse,UserId
import math
router = APIRouter()


@router.get("/products")
def get_products(
    page: int = 1,
    limit: int = 10,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    offset = (page - 1) * limit

    products = (
        db.query(Product)
        .filter(Product.is_available==True,Product.quantity!=0)
        .order_by(Product.id)
        .offset(offset)
        .limit(limit)
        .all()
    )

    result = []
    
    total = db.query(Product).count()

    totalPages = math.ceil(total / limit)

    for product in products:

        likes = (
            db.query(func.count(ProductLike.id))
            .filter(ProductLike.product_id == product.id)
            .scalar()
        )

        is_liked = (
            db.query(ProductLike)
            .filter(
                ProductLike.product_id == product.id,
                ProductLike.user_id == current_user.id
            )
            .first()
            is not None
        )

        result.append(
            ProductResponse(
                **product.__dict__,
                likes=likes,
                is_liked=is_liked
            )
        )

    return {
        'products':result,
        'page':page,
        'limit':limit,
        'total_pages':totalPages
    }
    

