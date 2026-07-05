from flask import Flask, request, jsonify
from ultralytics import YOLO
import cv2
import numpy as np

app = Flask(__name__)

# load your model
model = YOLO("yolo11n.pt")

@app.route("/predict", methods=["POST"])
def predict():

    file = request.files["image"]

    # convert image to numpy
    img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)

    # run YOLO
    results = model(img)[0]

    detections = []

    for box in results.boxes:
        x1, y1, x2, y2 = box.xyxy[0].tolist()
        conf = float(box.conf[0])
        cls = int(box.cls[0])

        detections.append({
            "x1": x1,
            "y1": y1,
            "x2": x2,
            "y2": y2,
            "class": model.names[cls],
            "conf": conf
        })

    return jsonify(detections)

if __name__ == "__main__":
    app.run(debug=True)