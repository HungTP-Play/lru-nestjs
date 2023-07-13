import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const shortUUID = require('short-uuid');

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const requestId = shortUUID.generate();
    req.headers.requestId = requestId;
    next();
  }
}
