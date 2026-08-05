import os
import json
import pika

class RabbitMQService:
    def __init__(self):
        rabbit_url = os.getenv("RABBIT_URL", "amqp://localhost")
        self.connection = pika.BlockingConnection(pika.URLParameters(rabbit_url))
        self.channel = self.connection.channel()

    def publish_message(self, queue_name: str, message: dict):
        self.channel.queue_declare(queue=queue_name, durable=True)
        self.channel.basic_publish(
            exchange='',
            routing_key=queue_name,
            body=json.dumps(message),
            properties=pika.BasicProperties(
                delivery_mode=2,  # make message persistent
            ))
        print(f" [x] Sent message to {queue_name}")

    def start_consuming(self, queue_name: str, callback):
        self.channel.queue_declare(queue=queue_name, durable=True)

        def internal_callback(ch, method, properties, body):
            message = json.loads(body)
            callback(message)
            ch.basic_ack(delivery_tag=method.delivery_tag)

        self.channel.basic_qos(prefetch_count=1)
        self.channel.basic_consume(queue=queue_name, on_message_callback=internal_callback)

        print(f" [*] Waiting for messages in {queue_name}. To exit press CTRL+C")
        self.channel.start_consuming()

rabbitmq_service = RabbitMQService()
