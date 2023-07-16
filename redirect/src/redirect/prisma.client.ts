import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async getOriginalUrl(shortenUrl: string): Promise<string> {
    const result = await this.redirectUrl.findUnique({
      where: {
        shortUrl: shortenUrl,
      },
    });
    if (!result) {
      throw new Error('No url found');
    }
    return result.url;
  }
}
