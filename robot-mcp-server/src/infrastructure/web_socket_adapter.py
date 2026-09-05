import json
import asyncio

from websockets.asyncio.client import connect, ClientConnection


class WebSocketAdapter:
    def __init__(self):
        self._uri = "ws://localhost:8080"
        self._wss: ClientConnection = None
    
    async def connect(self):
        retries = 0
        while retries < 3:
            try:
                self._wss = await connect(self._uri)
                print("Connection stablished with the server!")
                break
            except Exception as err:
                print(f"Could not stablish connection, reason: {err}")
                retries+=1
            await asyncio.sleep(10)

    
    async def send_message(
        self,
        msg_type: str,
        message: str,
    ) -> None:
        if not self._wss:
            raise RuntimeError("WebSocket is not connected!")

        json_message = json.dumps({
            "type": msg_type,
            "message": message,
        })

        await self._wss.send(json_message)
    
    async def recv(self) -> None:
        if not self._wss:
            raise RuntimeError("WebSocket is not connected!")
        
        return await self._wss.recv()
