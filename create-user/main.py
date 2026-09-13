from app.router import router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
app=FastAPI()


app.mount("/acc-uploads", StaticFiles(directory="acc-uploads"), name="acc-uploads")

app.include_router(router)



app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)