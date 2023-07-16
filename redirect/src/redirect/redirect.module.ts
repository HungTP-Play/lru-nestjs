import { Module, Provider } from '@nestjs/common';
import { RabbitMQCommunicator } from 'src/rabbitmq';
import { PrismaService } from './prisma.client';
import { RedirectController } from './redirect.controller';
import { RedirectService } from './redirect.service';

const analyticServiceProvider: Provider = {
  provide: 'ANALYTIC_SERVICE',
  useFactory: () => {
    const connectionString =
      process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672';
    return new RabbitMQCommunicator(connectionString);
  },
};

@Module({
  controllers: [RedirectController],
  providers: [RedirectService, analyticServiceProvider, PrismaService],
})
export class RedirectModule {}
