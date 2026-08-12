import os
from aiokafka import AIOKafkaProducer, AIOKafkaConsumer

KAFKA_BOOTSTRAP_SERVERS = os.getenv("KAFKA_BOOTSTRAP_SERVERS", "localhost:9092")

# We will initialize these in the main app startup event
kafka_producer: AIOKafkaProducer = None

async def get_kafka_producer() -> AIOKafkaProducer:
    global kafka_producer
    if kafka_producer is None:
        kafka_producer = AIOKafkaProducer(
            bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS,
        )
        await kafka_producer.start()
    return kafka_producer

async def close_kafka_producer():
    global kafka_producer
    if kafka_producer is not None:
        await kafka_producer.stop()
        kafka_producer = None
