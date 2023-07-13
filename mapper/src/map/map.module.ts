import { Module } from '@nestjs/common';
import { MapController } from './map.controller';
import { MapService } from './map.service';
import { PrismaService } from './prisma.client';

@Module({
  controllers: [MapController],
  providers: [PrismaService, MapService],
})
export class MapModule {}
