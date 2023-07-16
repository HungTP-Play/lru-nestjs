import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedirectModule } from './redirect/redirect.module';

@Module({
  imports: [RedirectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
