
class FileReaderAdapter:
    def __init__(self, script_dir: str):
        self._script_dir = script_dir

    def read_file(self, file_path: str):
        file_path = self._script_dir / file_path
        with open(file_path, "r", encoding="utf-8") as file:
            content = file.read()
        return content
