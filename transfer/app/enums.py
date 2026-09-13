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
    
class TypeEnum(StrEnum):
    BUY='buy'
    TRANSFER='transfer'
    FROM_TRANSFER='from_transfer'

rates:dict[tuple[CurrencyEnum,CurrencyEnum],float]={
    (CurrencyEnum.RUB,CurrencyEnum.USD):95.0,
    (CurrencyEnum.USD,CurrencyEnum.RUB):0.0105,
    (CurrencyEnum.EUR,CurrencyEnum.RUB):0.0097,
    (CurrencyEnum.EUR,CurrencyEnum.USD):0.92,
    (CurrencyEnum.RUB,CurrencyEnum.EUR):103.26,
    (CurrencyEnum.EUR,CurrencyEnum.RUB):0.0097,
    (CurrencyEnum.USD,CurrencyEnum.EUR):1.087
    
}