import { Module } from '@nestjs/common';
import { ShortenController } from './shorten.controller';
import { ShortenService } from './shorten.service';

@Module({
  controllers: [ShortenController],
  providers: [ShortenService],
  imports: [],
})
export class ShortenModule {}
