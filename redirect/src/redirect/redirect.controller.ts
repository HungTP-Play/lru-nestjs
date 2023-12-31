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
  constructor(private redirectService: RedirectService) {}
  @Get('/')
  async redirect(@Body() body: RedirectDTO) {
    try {
      console.log('[[ redirect ]] redirect', body);
      const result = await this.redirectService.getOriginalUrl(body);
      return result;
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No url found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
