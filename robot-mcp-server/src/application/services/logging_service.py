from logging import Logger



class LoggerService:
    def __init__(self):
        self._logger = Logger("Robot MCP Server")
        self._level = INFO

    def log_message(self, message: str) -> None:
        self._logger.log(self._level)
