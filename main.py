from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import torch
from model import transfer_model
import copy
import cv2
from predict import predict_img_class


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

@app.post('/uploadfile/')
async def create_upload_file(file_upload: UploadFile):
    data = await file_upload.read()
    save_to = UPLOAD_DIR / file_upload.filename
    with open(save_to, 'wb') as f:
        f.write(data)
    
    pr = predict_img_class(upl_model, f'uploads/{file_upload.filename}', device)
    pr = int((pr.cpu().detach())[0])

    return 'dog' if pr==0 else 'cat'
