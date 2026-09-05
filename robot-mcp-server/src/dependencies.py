from pathlib import Path

from src.infrastructure.robot_engine_adapter import RobotAdapter
from src.application.services.robot_commander_service import RobotCommander
from src.infrastructure.file_reader_adapter import FileReaderAdapter
from src.application.services.file_reader_service import FileReaderService
from src.infrastructure.camera_adapter import CameraAdapter
from src.infrastructure.web_socket_adapter import WebSocketAdapter
from src.application.services.camera_streamer import CameraStreamer

_documenation_file_path = "README.md"
_robot_adapter: RobotAdapter = None
_robot_commander_service: RobotCommander = None
_file_reader_adapter: FileReaderAdapter = None
_file_reader_service: FileReaderService = None
_camera_adapter: CameraAdapter = None
_web_socket_adapter: WebSocketAdapter = None
_camera_streamer: CameraStreamer = None


def get_robot_adapter() -> RobotAdapter:
    global _robot_adapter
    if not _robot_adapter:
        _robot_adapter = RobotAdapter()
    return _robot_adapter

def get_robot_commander() -> RobotCommander:
    global _robot_commander_service
    if not _robot_commander_service:
        _robot_commander_service = RobotCommander(
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

def get_web_socket_adapter() -> WebSocketAdapter:
    global _web_socket_adapter
    if not _web_socket_adapter:
        _web_socket_adapter = WebSocketAdapter()
    return _web_socket_adapter

def get_camera_streamer() -> CameraStreamer:
    global _camera_streamer
    if not _camera_streamer:
        _camera_streamer = CameraStreamer(
            camera_adapter=get_camera_adapter(),
            web_socket_adapter=get_web_socket_adapter()
        )
    return _camera_streamer
