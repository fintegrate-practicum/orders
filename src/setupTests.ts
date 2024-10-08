process.env.PAPERTRAIL_HOST = 'logs.papertrailapp.com';
process.env.PAPERTRAIL_PORT = '19382';
process.env.AMQP_PORT = '5672';
process.env.AMQP_HOST = 'rabbitmq';
process.env.AMQP_URL = 'amqp://${AMQP_HOST}:${AMQP_PORT}';
process.env.AMQP_USERNAME = 'guest';
process.env.AMQP_PASSWORD = 'guest';
process.env.RABBITMQ_EXCHANGE_NAME = 'message_exchange';
process.env.RABBITMQ_QUEUE_NAME = 'message_queue';
process.env.VITE_DOCKER_INVENTORY_SERVER_URL =
  'http://host.docker.internal:4003/api';
