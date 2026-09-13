from ultralytics import YOLO

class ImagePredictorAdapter:
    def __init__(self):
        self._model = self._model = YOLO("yolo11n_ncnn_model")

    def predict_image(self, frame):
        return self._model.predict(frame, show=False)[0]
