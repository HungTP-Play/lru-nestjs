import { Body, Controller, Post } from '@nestjs/common';
import { ShortenDTO, ShortenResponseDTO } from 'src/model/models';

@Controller('map')
export class MapController {
  @Post('/')
  async map(@Body() mapDTO: ShortenDTO): Promise<ShortenResponseDTO> {
    console.log(mapDTO);
    return {
      id: mapDTO.id,
      shortUrl: 'shortUrl',
      url: mapDTO.url,
    };
  }
}
