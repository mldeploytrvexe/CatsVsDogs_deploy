from fastapi import FastAPI, UploadFile, Request, Form
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import torch
from model import transfer_model
import copy
from predict import predict_img_class
from typing import List, Dict
from pydantic import BaseModel
from random import shuffle


class Item(BaseModel):
    loc: list
    msg: str
    type: str


UPLOAD_DIR = Path() / 'uploads'
device = 'cuda' if torch.cuda.is_available() else 'cpu'
upl_model = copy.deepcopy(transfer_model)
upl_model.load_state_dict(torch.load('correct_models/densenet_3unfrozen_layers.pth'))
upl_model = upl_model.to(device)
upl_model = upl_model.eval()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/uploadfile')
async def create_upload_file(file_upload: UploadFile):
    data = await file_upload.read()
    save_to = UPLOAD_DIR / file_upload.filename
    with open(save_to, 'wb') as f:
        f.write(data)
    pr = predict_img_class(upl_model, f'uploads/{file_upload.filename}', device)
    pr = int((pr.cpu().detach())[0])
    return 'собака' if pr==0 else 'кошка'

@app.post('/uploadfeedback')
async def feedback(request: Request):
    text = await request.form()
    #print(text['text_upload'])
    txt = text['text_upload']
    if txt != '':
        with open("feedbacks.txt", 'r') as file:
            lines = file.readlines()
            a = [line for line in lines]
            #print(len(a))
        with open("feedbacks.txt", 'w') as file:
            if len(a) != 0:
                #print(len(a))
                file.writelines(a)
                file.write(f'\n{len(a)+1} {txt}')
            else:
                file.write(f'{len(a)+1} {txt}')
        return 'feedback delivered'
    else:
        return 'nothing to deliver'
    

@app.get('/loadfeedbacks')
async def load_feedback():
    with open("feedbacks.txt", 'r') as file:
            lines = file.readlines()
    shuffle(lines)
    #print(lines)
    return lines[:3]