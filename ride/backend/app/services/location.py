from fastapi import APIRouter, WebSocket, WebSocketDisconnect, HTTPException
import json
from typing import Set, Dict

router = APIRouter(prefix="/api/v1", tags=["Live Location"])


connections: Dict[int, Set[WebSocket]] = {}

# Store the latest location per user_id
user_locations: Dict[int, dict] = {}

@router.websocket("/ws/location/{user_id}")
async def WebsocketLocationHandler(websocket:WebSocket , user_id: int):
    # Register the connection
    connections.setdefault(user_id, set()).add(websocket)
    try:
        while True:
            data = await websocket.receive_json()
            # Only process location update messages
            if data.get("type") != "location:update":
                continue

            location = {
                "type": "location:update",
                "userId": user_id,
                "latitude": data["latitude"],
                "longitude": data["longitude"],
                "accuracy": data.get("accuracy"),
                "heading": data.get("heading"),
                "speed": data.get("speed"),
            }

            # Broadcast to every connected client
            for user_conns in connections.values():
                for client in list(user_conns):
                    try:
                        await client.send_json(location)
                    except Exception:
                        # Remove dead connections
                        user_conns.discard(client)
    except WebSocketDisconnect:
        # Cleanup on disconnect
        connections[user_id].discard(websocket)
        if not connections[user_id]:
            del connections[user_id]

async def userlocation(user_id, connections, data=None):
    try:
        if user_id in connections:
            for client in list(connections[user_id]):
                await client.send_json(data or {})
    except Exception as error:
        raise HTTPException(status_code=500, detail=f"ready exception: {error}")
