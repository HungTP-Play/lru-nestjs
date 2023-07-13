import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async createShortenUrl(url: string, shortenUrl: string) {
    return this.urlMap.create({
      data: {
        url,
        short_url: shortenUrl,
      },
    });
  }

  async countUrlMapLength(): Promise<number> {
    return this.urlMap.count();
  }
}
