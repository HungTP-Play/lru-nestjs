import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RedirectDTO } from 'src/model/models';
import { RedirectService } from './redirect.service';

@Controller('/redirect')
export class RedirectController {
  constructor(private readonly redirectService: RedirectService) {}

  @Get('/')
  async redirect(@Body() body: RedirectDTO) {
    try {
      const result = await this.redirectService.getOriginalUrl({
        id: body.id,
        url: body.url,
      });
      return result;
    } catch (e) {
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }
}
