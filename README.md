# estudart-mcp-robot 🤖

An end-to-end AI robotics project: a **Raspbot V2** (Raspberry Pi robot car) controlled through
an **MCP (Model Context Protocol) server**, driven by a **LangChain/LangGraph agent** running on a
**local Ollama LLM** — no cloud, no API keys, fully self-hosted.

<p align="center">
  <img src="https://raw.githubusercontent.com/YahboomTechnology/Raspbot-V2/main/Raspbot_V2_Yahboom.jpg" alt="Yahboom Raspbot V2" width="480">
</p>

<p align="center">
  <sub>Raspbot V2 — image from the official <a href="https://github.com/YahboomTechnology/Raspbot-V2">YahboomTechnology/Raspbot-V2</a> repository.</sub>
</p>

## How it works

```
 You  ──ask──▶  robot-agent (Node/TS)  ──MCP tools──▶  mcp-server (Python)  ──▶  Raspbot V2 (hardware)
                       │
                       ▼
                 Ollama (local LLM)
```

1. **`robot-agent`** — a Node.js/TypeScript service. A LangChain `ReactAgent` (backed by a local
   Ollama model, e.g. `llama3.2:3b`) reads the tools exposed by the MCP server and decides which
   ones to call based on what you ask it.
2. **`mcp-server`** — a Python **FastMCP** server exposing the robot's capabilities (LEDs, motors,
   sensors) as MCP tools. It talks to the physical robot through the
   [`raspbot`](https://nbourre.github.io/raspbotv2-lib) library.
3. **Ollama + Open WebUI** — Ollama runs the LLM **natively on the host** (not in Docker —
   performance takes a big hit running the model inside a container, especially on macOS).
   Open WebUI still runs via `docker-compose.yml` and connects to the host's Ollama, giving you a
   free ChatGPT-like web UI alongside the agent.

## Project structure

| Path | What it is |
|---|---|
| `robot-agent/` | Node.js/TS agent: connects to the MCP server, wraps its tools as LangChain tools, and chats via Ollama |
| `robot-agent/src/application/agents` | `RobotAgent` — the LangChain `ReactAgent` + system prompt |
| `robot-agent/src/application/services` | `RobotAssistent` — the interactive CLI loop |
| `robot-agent/src/infrastructure/mcp-adapter.ts` | MCP client (Streamable HTTP transport) used to list/call tools |
| `mcp-server/` | Python **FastMCP** server exposing robot control as MCP tools |
| `mcp-server/src/infrastructure/robot_engine_adapter.py` | Wraps the `raspbot` hardware library (LEDs, motors, sensors) |
| `docker-compose.yml` | Ollama + Open WebUI, for local LLM inference and a free chat UI |

This follows a clean/hexagonal architecture: **infrastructure** talks to the outside world
(hardware, MCP transport), **application** holds orchestration logic, and each layer only depends
on primitives — never on details of the layer below it.

## Running it

```bash
# 1. Install and run Ollama natively on the host (do NOT run the model inside Docker —
#    performance is much worse in a container, especially on macOS)

# macOS
brew install ollama

# Linux / Debian (e.g. Raspberry Pi OS)
curl -fsSL https://ollama.com/install.sh | sh

# then, on either OS:
ollama serve
ollama pull llama3.2:3b
ollama run llama3.2:3b

# 2. (optional) Start Open WebUI, a free ChatGPT-like UI that connects to the host's Ollama
docker compose up -d

# 3. Start the MCP server (exposes robot tools over HTTP)
cd mcp-server
source .venv/bin/activate
uvicorn src.application.server:app --reload

# 4. Start the agent (talks to the MCP server + Ollama)
cd robot-agent
npm run main
```

Then just type what you want the robot to do — the agent will call the right MCP tool for you.

## Roadmap

- [x] MCP server skeleton (FastMCP)
- [x] LangChain/LangGraph agent wired to MCP tools via Ollama
- [x] Local Ollama + Open WebUI setup
- [ ] LED control tool (`raspbot.actuators.led_bar.LedBar`) — in progress
- [ ] Motor control tools
- [ ] Sensor tools (camera / ultrasonic / etc.)
- [ ] React UI to chat with the robot agent

---

*A hobby project mixing hardware, AI agents, Node.js and Python — built to learn, one PR at a time.*
