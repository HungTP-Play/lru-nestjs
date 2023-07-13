import { Injectable } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { ShortenDTO, ShortenResponseDTO } from 'src/model/models';

@Injectable()
export class ShortenService {
  private getMapperUrl(): string {
    const mapperHost = process.env.MAPPER_HOST || 'mapper';
    const mapperPort = process.env.MAPPER_PORT || '1111';
    return `http://${mapperHost}:${mapperPort}`;
  }
  async shorten(shortenDTO: ShortenDTO): Promise<ShortenResponseDTO> {
    const MAP_URL = `${this.getMapperUrl()}/map`;
    try {
      const response = await axios.post(MAP_URL, {
        id: shortenDTO.id,
        url: shortenDTO.url,
      });
      console.log(response.data as ShortenResponseDTO);
      return response.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        const status = e.response?.status;
        if (status >= 400) {
          throw new Error('Client error');
        }

        if (status >= 500) {
          throw new Error('Server error');
        }
      }
    }
  }
}
