import { Body, Controller, Get } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import {
  RedirectDTO,
  RedirectResponseDTO,
  ShortenResponseDTO,
} from 'src/model/models';

@Controller('/redirect')
export class RedirectController {
  @Get('/')
  redirect(@Body() body: RedirectDTO) {
    return <RedirectResponseDTO>{
      id: body.id,
      originalUrl: body.url,
      url: body.url,
    };
  }

  @EventPattern('redirect::create')
  createRedirect(
    @Payload() data: ShortenResponseDTO,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    console.log('redirect::create', data);
    channel.ack(originalMsg);
  }
}
