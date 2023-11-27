// var request = require('request');
import request from 'request'
var options = {
  'method': 'POST',
  'url': 'https://stablediffusionapi.com/api/v3/lora_fine_tune',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "key":"zNa0zNre63wLImUchXO399r4m0vX8ILBZ3KnkiZoSoMmGFAPc03Wi1KbF6Z4",
    "instance_prompt": "photo of ambika0 man",
    "class_prompt": "photo of a man",
    "base_model_type": "sdxl",
    "negative_prompt":" lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry",
    "images": [
    "https://raw.githubusercontent.com/pnavitha/sampleImages/master/1.png",
    "https://raw.githubusercontent.com/pnavitha/sampleImages/master/2.png",
    "https://raw.githubusercontent.com/pnavitha/sampleImages/master/3.png",
    "https://raw.githubusercontent.com/pnavitha/sampleImages/master/4.png",
    "https://raw.githubusercontent.com/pnavitha/sampleImages/master/5.png",
    "https://raw.githubusercontent.com/pnavitha/sampleImages/master/6.png",
    "https://raw.githubusercontent.com/pnavitha/sampleImages/master/7.png",
    "https://raw.githubusercontent.com/pnavitha/sampleImages/master/8.png",
    "https://raw.githubusercontent.com/pnavitha/sampleImages/master/9.png"
  ],
    "seed": "0",
    "training_type": "men",
    "max_train_steps": "2",
    "lora_type":"lora",
    "webhook": null
  })
};

request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});