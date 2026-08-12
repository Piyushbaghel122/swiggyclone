import os
import json
import asyncio
import aio_pika
from typing import Callable, Any

RABBITMQ_URL = os.getenv("RABBITMQ_URL", "amqp://guest:guest@localhost/")

class RabbitMQService:
    def __init__(self):
        self.connection = None
        self.channel = None

    async def connect(self):
        """Establish connection to RabbitMQ."""
        if not self.connection:
            self.connection = await aio_pika.connect_robust(RABBITMQ_URL)
            self.channel = await self.connection.channel()
            print("Connected to RabbitMQ")

    async def close(self):
        """Close RabbitMQ connection."""
        if self.connection:
            await self.connection.close()
            print("Disconnected from RabbitMQ")

    async def publish(self, queue_name: str, message: dict):
        """Publish a message to a specific queue."""
        if not self.channel:
            await self.connect()
            
        queue = await self.channel.declare_queue(queue_name, durable=True)
        
        await self.channel.default_exchange.publish(
            aio_pika.Message(
                body=json.dumps(message).encode(),
                delivery_mode=aio_pika.DeliveryMode.PERSISTENT
            ),
            routing_key=queue_name
        )
        print(f"Message published to '{queue_name}'")

    async def subscribe(self, queue_name: str, callback: Callable[[dict], Any]):
        """Subscribe to a queue and process messages with a callback function."""
        if not self.channel:
            await self.connect()
            
        queue = await self.channel.declare_queue(queue_name, durable=True)
        
        async def process_message(message: aio_pika.abc.AbstractIncomingMessage):
            async with message.process():
                body = json.loads(message.body.decode())
                print(f"Received message from '{queue_name}'")
                
                # Execute the callback with the parsed dictionary
                if asyncio.iscoroutinefunction(callback):
                    await callback(body)
                else:
                    callback(body)

        await queue.consume(process_message)
        print(f"Subscribed and listening to '{queue_name}'...")

rabbitmq = RabbitMQService()