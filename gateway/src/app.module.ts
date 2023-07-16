import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from 'filter/exception.filter';
import { RequestIdMiddleware } from 'middlewares/request_id.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedirectModule } from './redirect/redirect.module';
import { ShortenModule } from './shorten/shorten.module';

@Module({
  imports: [ShortenModule, RedirectModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
