import { Injectable } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { RedirectDTO, RedirectResponseDTO } from 'src/model/models';

@Injectable()
export class RedirectService {
  getRedirectUrl(): string {
    const host = process.env.REDIRECT_HOST || 'redirect';
    const port = process.env.REDIRECT_PORT || '2222';
    return `http://${host}:${port}/redirect`;
  }

  async getOriginalUrl(dto: RedirectDTO): Promise<RedirectResponseDTO> {
    try {
      const result = await axios.request({
        headers: {
          'Content-Type': 'application/json',
        },
        url: this.getRedirectUrl(),
        method: 'GET',
        data: {
          id: dto.id,
          url: dto.url,
        },
      });
      return result.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response.status === 404) {
          throw new Error('No url found');
        }
        throw new Error('Internal Server Error');
      }
    }
  }
}
