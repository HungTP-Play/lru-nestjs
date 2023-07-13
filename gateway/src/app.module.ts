import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RequestIdMiddleware } from 'middlewares/request_id.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShortenModule } from './shorten/shorten.module';

@Module({
  imports: [ShortenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
