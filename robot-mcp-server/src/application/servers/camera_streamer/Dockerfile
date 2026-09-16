FROM python:3.12-slim

RUN apt-get update && apt-get install -y curl libgl1 libglib2.0-0 libsm6 libxext6 libxrender1 libxcb1 && rm -rf /var/lib/apt/lists/*

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app

ENV PATH="/app/.venv/bin:$PATH"
ENV UV_LINK_MODE=copy

COPY pyproject.toml uv.lock ./

RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --frozen --no-install-project

COPY . .

RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --frozen

CMD ["uv", "run", "python", "-m", "src.application.servers.camera_streamer.streamer"]
