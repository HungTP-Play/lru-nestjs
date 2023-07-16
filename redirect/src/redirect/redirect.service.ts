import { Inject, Injectable } from '@nestjs/common';
import {
  AnalyticMessage,
  RedirectDTO,
  RedirectResponseDTO,
} from 'src/model/models';
import { RabbitMQCommunicator } from 'src/rabbitmq';
import { PrismaService } from './prisma.client';

@Injectable()
export class RedirectService {
  constructor(
    @Inject('ANALYTIC_SERVICE')
    private analyticService: RabbitMQCommunicator,
    private dbService: PrismaService,
  ) {}

  async getOriginalUrl(dto: RedirectDTO): Promise<RedirectResponseDTO> {
    const url = dto.url;
    const result = await this.dbService.getOriginalUrl(url);
    const message: RedirectResponseDTO = {
      id: dto.id,
      url: dto.url,
      originalUrl: result,
    };

    // Send message to analytic service
    const analyticMessage: AnalyticMessage = {
      id: dto.id,
      url: result,
      shortUrl: dto.url,
      type: 'REDIRECT',
    };

    this.analyticService.sendToQueue(
      'analytic',
      JSON.stringify(analyticMessage),
    );
    console.log('[[ redirect ]] send message to analytic service', message);

    return message;
  }
}
