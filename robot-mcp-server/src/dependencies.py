from src.infrastructure.robot_engine_adapter import RobotAdapter
from src.application.robot_commander_service import RobotCommander
from src.infrastructure.file_reader_adapter import FileReaderAdapter

_robot_adapter: RobotAdapter = None
_robot_commander_service: RobotCommander = None
_file_reader_adapter: FileReaderAdapter = None


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
        _file_reader_adapter = FileReaderAdapter()
    return FileReaderAdapter