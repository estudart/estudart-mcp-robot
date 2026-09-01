from src.infrastructure.file_reader_adapter import FileReaderAdapter


class FileReaderService:
    def __init__(
        self,
        file_reader_adapter: FileReaderAdapter,
        documentation_file_path: str
    ) -> None:
        self._file_reader_adapter = file_reader_adapter
        self._documentation_path = documentation_file_path

    def get_repo_documentation(self) -> str:
        return self._file_reader_adapter.read_file(
            self._documentation_path
        )
