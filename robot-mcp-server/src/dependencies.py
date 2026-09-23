import os
from pathlib import Path

from src.infrastructure.robot_engine_adapter import RobotAdapter
from src.application.services.robot_commander_service import RobotCommander
from src.infrastructure.file_reader_adapter import FileReaderAdapter
from src.infrastructure.speech_adapter import SpeechAdapter
from src.application.services.speak_service import SpeakService
from src.application.services.file_reader_service import FileReaderService
from src.infrastructure.camera_adapter import CameraAdapter
from src.infrastructure.web_socket_adapter import WebSocketAdapter
from src.application.services.camera_streamer import CameraStreamer
from src.application.services.distance_streamer import DistanceStreamer
from src.infrastructure.image_prediction_adapter import ImagePredictorAdapter
from src.application.services.logging_service import LoggerService
from src.config import settings

_documenation_file_path = "README.md"
_robot_adapter: RobotAdapter = None
_robot_commander_service: RobotCommander = None
_file_reader_adapter: FileReaderAdapter = None
_file_reader_service: FileReaderService = None
_camera_adapter: CameraAdapter = None
_speech_adapter: SpeechAdapter = None
_speak_service: SpeakService = None
_web_socket_adapter: WebSocketAdapter = None
_camera_streamer: CameraStreamer = None
_distance_streamer: DistanceStreamer = None
_image_predictor_adapter: ImagePredictorAdapter = None
_logger_service: LoggerService = None

WS_SERVER_URL = settings.WS_SERVER_URL
SHOULD_PREDICT = settings.SHOULD_PREDICT

def get_logger_service() -> LoggerService:
    global _logger_service
    if not _logger_service:
        _logger_service = LoggerService()
    return _logger_service

def get_robot_adapter() -> RobotAdapter:
    global _robot_adapter
    if not _robot_adapter:
        _robot_adapter = RobotAdapter()
    return _robot_adapter

def get_robot_commander() -> RobotCommander:
    global _robot_commander_service
    if not _robot_commander_service:
        _robot_commander_service = RobotCommander(
            logger_service=get_logger_service(),
            robot_adapter=get_robot_adapter()
        )
    return _robot_commander_service

def get_file_reader_adapter() -> FileReaderAdapter:
    global _file_reader_adapter
    if not _file_reader_adapter:
        _file_reader_adapter = FileReaderAdapter(
            script_dir=Path(__file__).resolve().parents[1]
        )
    return _file_reader_adapter

def get_file_reader_service() -> FileReaderService:
    global _file_reader_service
    if not _file_reader_service:
        _file_reader_service = FileReaderService(
            file_reader_adapter=get_file_reader_adapter(),
            documentation_file_path=_documenation_file_path
        )
    return _file_reader_service

def get_camera_adapter() -> CameraAdapter:
    global _camera_adapter
    if not _camera_adapter:
        _camera_adapter = CameraAdapter()
    return _camera_adapter

def get_speech_adapter() -> SpeechAdapter:
    global _speech_adapter
    if not _speech_adapter:
        _speech_adapter = SpeechAdapter()
    return _speech_adapter

def get_speak_service() -> SpeakService:
    global _speak_service
    if not _speak_service:
        _speak_service = SpeakService(
            logger_service=get_logger_service(),
            speech_adapter=get_speech_adapter()
        )
    return _speak_service

def get_web_socket_adapter() -> WebSocketAdapter:
    global _web_socket_adapter
    if not _web_socket_adapter:
        _web_socket_adapter = WebSocketAdapter(uri=WS_SERVER_URL)
    return _web_socket_adapter

def get_image_predictor_adapter() -> ImagePredictorAdapter:
    global _image_predictor_adapter
    if not _image_predictor_adapter:
        _image_predictor_adapter = ImagePredictorAdapter()
    return _image_predictor_adapter

def get_camera_streamer() -> CameraStreamer:
    global _camera_streamer
    if not _camera_streamer:
        _camera_streamer = CameraStreamer(
            logger_service=get_logger_service(),
            camera_adapter=get_camera_adapter(),
            web_socket_adapter=get_web_socket_adapter(),
            image_predictor_adapter=get_image_predictor_adapter(),
            should_predict=SHOULD_PREDICT
        )
    return _camera_streamer

def get_distance_streamer() -> DistanceStreamer:
    global _distance_streamer
    if not _distance_streamer:
        _distance_streamer = DistanceStreamer(
            logger_service=get_logger_service(),
            robot_adapter=get_robot_adapter(),
            web_socket_adapter=get_web_socket_adapter(),
        )
    return _distance_streamer
