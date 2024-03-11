import torch

import albumentations as A
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import cv2

from typing import Tuple, List
from pathlib import Path
from image_utils import preprocess, load_sample
from model import transfer_model
from config import get_config

config = get_config(Path("conf/base_config.yaml"))
preprocessing = A.load(str(config.dataset.val_preprocessing_config),
                       data_format='yaml')

def get_img_names(img_path: str) -> List[Path]:
  img_path = Path(img_path)
  if img_path.is_file():
      return [img_path]
  paths = Path(img_path).glob('**/*')
  return [x for x in paths if x.is_file()]
  
def prepare_img(img_path: Path) -> torch.Tensor:
  image = preprocess(load_sample(img_path), transform=preprocessing)
  image = image.transpose((2, 0, 1))
  image = torch.from_numpy(image.copy()).float().contiguous()
  return image.unsqueeze(0)

def predict_img_class(model, path_image, device) -> torch.Tensor:
  data = prepare_img(path_image)
  data = data.to(device)
  with torch.no_grad():
      output = model(data).squeeze()
      predicted = (output > 0.5).float()
  return predicted if predicted.size() else predicted.unsqueeze(0)

def show_predicted(images: List[Path],
                   predicted: torch.Tensor):
   for i, img in enumerate(images):
     preprocess(load_sample(img), preprocessing, 2)
     print(f"Predicted class for photo {i+1}: {predicted[i]} - {'cat' if predicted[i] else 'dog'}")


def make_submission_csv(img_names: List[Path],
                        predicted: torch.Tensor, path: str) -> pd.DataFrame:
  # path - path for saving the submission.csv
  df = pd.DataFrame({'img_names': img_names, 'class': predicted.tolist()})
  df.to_csv(path)
  print("Saved", path)
  return df



