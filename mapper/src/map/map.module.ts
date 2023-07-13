import { Module } from '@nestjs/common';
import { MapController } from './map.controller';

@Module({
  controllers: [MapController],
  providers: [],
})
export class MapModule {}
