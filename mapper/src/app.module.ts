import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MapModule } from './map/map.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [MapModule],
})
export class AppModule {}
