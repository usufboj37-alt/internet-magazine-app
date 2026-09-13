import os
import shutil
import uuid

from sqlalchemy.orm import Session
from fastapi import UploadFile

from app.models import User, Product
from app.schemas import ProductRequest

UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


def create_product(
    db: Session,
    current_user: User,
    product_cr: ProductRequest,
    image: UploadFile,
):
    filename = f"{uuid.uuid4()}_{image.filename}"
    filepath = os.path.join(UPLOAD_DIR, filename)

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    new_product = Product(
        name=product_cr.name,
        price=product_cr.price,
        category=product_cr.category,
        description=product_cr.description,
        image=filepath,   
        user_id=current_user.id,
        currency=product_cr.currency,
        quantity=product_cr.quantity
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product