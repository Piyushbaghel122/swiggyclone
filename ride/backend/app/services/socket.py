from typing import List, Dict
from fastapi import WebSocket

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.user_connections: Dict[str, WebSocket] = {}
        # Could also add rider tracking dicts here if needed
        self.rider_locations: Dict[str, dict] = {}

    async def connect(self, websocket: WebSocket, user_id: str = None):
        await websocket.accept()
        self.active_connections.append(websocket)
        if user_id:
            self.user_connections[user_id] = websocket

    def disconnect(self, websocket: WebSocket, user_id: str = None):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
        if user_id and user_id in self.user_connections:
            del self.user_connections[user_id]

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)
        
    async def send_to_user(self, message: str, user_id: str):
        if user_id in self.user_connections:
            await self.user_connections[user_id].send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)
            
    def update_rider_location(self, rider_id: str, latitude: float, longitude: float):
        self.rider_locations[rider_id] = {"lat": latitude, "lng": longitude}

manager = ConnectionManager()

def start_socket_server(app):
    from fastapi import WebSocketDisconnect

    @app.websocket("/ws/{user_id}")
    async def websocket_endpoint(websocket: WebSocket, user_id: str):
        await manager.connect(websocket, user_id)
        try:
            while True:
                data = await websocket.receive_json()
                # If riders are sending location updates:
                if data.get("type") == "location_update":
                    manager.update_rider_location(
                        rider_id=user_id, 
                        latitude=data.get("lat"), 
                        longitude=data.get("lng")
                    )
                    # Broadcast location to anyone tracking this rider
                    await manager.broadcast(str({"rider_id": user_id, "lat": data.get("lat"), "lng": data.get("lng")}))
                else:
                    await manager.send_personal_message(f"Received: {data}", websocket)
        except WebSocketDisconnect:
            manager.disconnect(websocket, user_id)