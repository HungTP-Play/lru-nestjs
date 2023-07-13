import { Injectable } from '@nestjs/common';
import { ShortenDTO, ShortenResponseDTO } from 'src/model/models';
import { PrismaService } from './prisma.client';

@Injectable()
export class MapService {
  constructor(private prismaService: PrismaService) {}
  private base62Encode(num: number): string {
    const base62 =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    while (num > 0) {
      result = base62[num % 62] + result;
      num = Math.floor(num / 62);
    }
    return result;
  }

  private getShortenUrl(id: number): string {
    return `${process.env.GATEWAY_URL}/${this.base62Encode(id)}`;
  }

  async shortenUrl(dto: ShortenDTO): Promise<ShortenResponseDTO> {
    const { url, id } = dto;
    const currentLength = await this.prismaService.countUrlMapLength();
    const shortenUrl = this.getShortenUrl(currentLength + 1);
    const result = await this.prismaService.createShortenUrl(url, shortenUrl);
    return {
      url: url,
      shortUrl: result.short_url,
      id: id,
    };
  }
}
