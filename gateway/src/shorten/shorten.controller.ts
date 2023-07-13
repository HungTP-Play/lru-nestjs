import { Body, Controller, HttpException, Post, Request } from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { ShortenDTO } from 'src/model/models';
import { ShortenService } from './shorten.service';

@Controller('shorten')
export class ShortenController {
  constructor(private shortenService: ShortenService) {}
  @Post('/')
  async shorten(@Body() body: ShortenDTO, @Request() request: any) {
    const requestId = request.headers.requestId;
    try {
      body.id = request.headers.requestId;
      const response = await this.shortenService.shorten(body);
      return {
        ...response,
      };
    } catch (e) {
      if (e.message === 'Client error') {
        throw new HttpException(
          {
            requestId,
          },
          HttpStatusCode.BadRequest,
        );
      }

      throw new HttpException(
        {
          requestId,
        },
        HttpStatusCode.InternalServerError,
      );
    }
  }
}
