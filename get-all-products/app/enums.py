from enum import StrEnum

class CategoryEnum(StrEnum):
    FOOD='Food'
    ELECTRONIC='Electronic'
    CLOTHING='Clothing'
    BOOKS='Books'
    SPORTS='Sports'
    HOME='Home'
    
class CurrencyEnum(StrEnum):
    RUB='rub'
    EUR='eur'
    USD='usd'