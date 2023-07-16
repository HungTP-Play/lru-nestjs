import { Module, Provider } from '@nestjs/common';
import { RabbitMQCommunicator } from 'src/rabbitmq';
import { MapController } from './map.controller';
import { MapService } from './map.service';
import { PrismaService } from './prisma.client';

const rabbitmqProvider: Provider = {
  provide: 'RABBITMQ_COMMUNICATOR',
  useFactory: () => {
    const connectionString =
      process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672';
    return new RabbitMQCommunicator(connectionString);
  },
};

const analyticCommunicatorProvider: Provider = {
  provide: 'ANALYTIC_COMMUNICATOR',
  useFactory: () => {
    const connectionString =
      process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672';
    return new RabbitMQCommunicator(connectionString);
  },
};

@Module({
  controllers: [MapController],
  providers: [
    PrismaService,
    MapService,
    rabbitmqProvider,
    analyticCommunicatorProvider,
  ],
})
export class MapModule {}
