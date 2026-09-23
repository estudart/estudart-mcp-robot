import logging



class LoggerService:
    def __init__(self, level):
        logging.basicConfig()
        self._logger = logging.getLogger("Robot MCP Server")
        self._level = level
        self._logger.setLevel(self._level)

    def log_info_message(self, message: str) -> None:
        self._logger.info(message)

    def log_error_message(self, message: str) -> None:
        self._logger.error(message)
