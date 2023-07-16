import { NestFactory } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';
import * as amqp from 'amqplib';
import { AppModule } from './app.module';
import { AnalyticMessage } from './model';
import { RabbitMQCommunicator } from './rabbitmq';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function onAnalyticMessage(message: amqp.Message) {
  console.log(`[[ analytic ]] Received analytic message: ${message.content}`);

  const dbClient = new PrismaClient();
  const analyticMessage = <AnalyticMessage>(
    JSON.parse(message.content.toString())
  );
  if (analyticMessage.type === 'MAP') {
    dbClient.urlMapAnalytic.create({
      data: {
        shortUrl: analyticMessage.shortUrl,
        url: analyticMessage.url,
      },
    });
    console.log(
      `[[ analytic ]] Saved analytic message -- MAP : ${message.content}`,
    );
  } else {
    dbClient.urlRedirectAnalytic.create({
      data: {
        shortUrl: analyticMessage.shortUrl,
        url: analyticMessage.url,
      },
    });
    console.log(
      `[[ analytic ]] Saved analytic message -- REDIRECT : ${message.content}`,
    );
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 4444;
  await app.listen(PORT);

  console.log(`[[ analytic ]] Listening on port ${PORT}`);

  await sleep(10000);

  const connectionString =
    process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672';
  const rabbitMQCommunicator = new RabbitMQCommunicator(connectionString);

  await rabbitMQCommunicator.connect();
  await rabbitMQCommunicator.assertQueue('analytic');
  await rabbitMQCommunicator.consume('analytic', onAnalyticMessage);
  console.log(`[[ analytic ]] Connected to RabbitMQ queue 'analytic'`);
}
bootstrap();
