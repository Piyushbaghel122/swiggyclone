import os
import json
from confluent_kafka import Producer, Consumer

KAFKA_BOOTSTRAP_SERVERS = os.getenv("KAFKA_BOOTSTRAP_SERVERS", "localhost:9092")

class KafkaService:
    def __init__(self):
        self.producer = Producer({'bootstrap.servers': KAFKA_BOOTSTRAP_SERVERS})

    def publish_message(self, topic: str, message: dict):
        def delivery_report(err, msg):
            if err is not None:
                print(f"Message delivery failed: {err}")
            else:
                print(f"Message delivered to {msg.topic()} [{msg.partition()}]")
        
        self.producer.produce(topic, json.dumps(message).encode('utf-8'), callback=delivery_report)
        self.producer.poll(0)
        self.producer.flush()

    def consume_messages(self, group_id: str, topics: list, callback):
        consumer = Consumer({
            'bootstrap.servers': KAFKA_BOOTSTRAP_SERVERS,
            'group.id': group_id,
            'auto.offset.reset': 'earliest'
        })

        consumer.subscribe(topics)

        try:
            while True:
                msg = consumer.poll(1.0)
                if msg is None:
                    continue
                if msg.error():
                    print(f"Consumer error: {msg.error()}")
                    continue

                value = json.loads(msg.value().decode('utf-8'))
                callback(value)
        except Exception as e:
            print(f"Exception while consuming: {e}")
        finally:
            consumer.close()

kafka_service = KafkaService()
