import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { RedirectController } from './redirect.controller';
import { RedirectService } from './redirect.service';

@Module({
  controllers: [RedirectController],
  providers: [RedirectService],
  imports: [
    ClientsModule.register([
      {
        name: 'REDIRECT_SERVICE',
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'redirect',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
})
export class RedirectModule {}
