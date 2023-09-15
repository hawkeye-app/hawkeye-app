from fastapi import FastAPI
from pydantic import BaseModel
from ball_tracking2 import tracking
app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Msg(BaseModel):
    url: str


@app.get("/")
async def hello_world():
    return {"message": "Hello World"}


@app.post("/predict")
async def predict(inp: Msg):
    pts_piques_finales = tracking(inp.url)

    return {"piques_finales": pts_piques_finales}
