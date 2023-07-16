import { NestFactory } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';
import amqp from 'amqplib';
import { AppModule } from './app.module';
import { RabbitMQCommunicator } from './rabbitmq';

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function onRedirectMessageConsumer(message: amqp.Message) {
  const content = message.content.toString();
  try {
    console.log(`[[ redirect ]] Received message: ${content}`);
    const { url, shortUrl } = JSON.parse(content) as {
      url: string;
      shortUrl: string;
      id: string;
    };

    const prismaClient = new PrismaClient();
    await prismaClient.redirectUrl.create({
      data: {
        url: url,
        shortUrl: shortUrl,
      },
    });
    console.log(`[[ redirect ]] Saved to database`);
  } catch (e) {
    console.error(
      `[[ redirect ]] Error Consuming message -- err: ${e}; message: ${content}`,
    );
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 2222;

  await app.listen(PORT);

  await sleep(10000);

  const rabbitMQCommunicator = new RabbitMQCommunicator(
    process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672',
  );

  await rabbitMQCommunicator.connect();
  await rabbitMQCommunicator.createChannel();
  await rabbitMQCommunicator.assertQueue('redirect');
  rabbitMQCommunicator.consume('redirect', onRedirectMessageConsumer);
  console.log(`[[ redirect ]] Start consuming redirect queue`);
}
bootstrap();
