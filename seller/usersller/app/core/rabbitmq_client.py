import os
import aio_pika

RABBIT_URL = os.getenv("RABBIT_URL", "amqp://guest:guest@127.0.0.1/")

rabbitmq_connection: aio_pika.RobustConnection = None

async def get_rabbitmq_connection() -> aio_pika.RobustConnection:
    global rabbitmq_connection
    if rabbitmq_connection is None or rabbitmq_connection.is_closed:
        rabbitmq_connection = await aio_pika.connect_robust(RABBIT_URL)
    return rabbitmq_connection

async def close_rabbitmq_connection():
    global rabbitmq_connection
    if rabbitmq_connection is not None and not rabbitmq_connection.is_closed:
        await rabbitmq_connection.close()
        rabbitmq_connection = None
