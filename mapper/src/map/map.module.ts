import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MapController } from './map.controller';
import { MapService } from './map.service';
import { PrismaService } from './prisma.client';

@Module({
  controllers: [MapController],
  providers: [PrismaService, MapService],
  imports: [
    ClientsModule.register([
      {
        name: 'REDIRECT_SERVICE',
        options: {
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://rabbitmq:5672'],
            queue: 'redirect',
            queueOptions: {
              durable: false,
            },
          },
        },
      },
    ]),
  ],
})
export class MapModule {}
