from sqlalchemy.orm import create_session,sessionmaker
from sqlalchemy import create_engine

engine=create_engine('postgresql+psycopg2://postgres:yusufboy2012@my-postgresql:5432/my-db')
SessionLocal=sessionmaker(bind=engine,expire_on_commit=False)