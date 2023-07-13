import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ShortenDTO, ShortenResponseDTO } from 'src/model/models';
import { MapService } from './map.service';

@Controller('map')
export class MapController {
  constructor(private mapService: MapService) {}
  @Post('/')
  async map(@Body() mapDTO: ShortenDTO): Promise<ShortenResponseDTO> {
    try {
      return await this.mapService.shortenUrl(mapDTO);
    } catch (e) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
