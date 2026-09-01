from pathlib import Path

from src.infrastructure.file_reader_adapter import FileReaderAdapter


def test_file_reader_adapter():
    file_reader = FileReaderAdapter(
        script_dir=Path(__file__).resolve().parents[1]
    )
    print(Path(__file__).resolve().parent)
    file_text = file_reader.read_file(
        file_path="files/test.md"
    )
    assert file_text == "This a test file for reading README.md"

test_file_reader_adapter()
