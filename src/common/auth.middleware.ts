
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from '../auth/auth.service';
import { getJwt } from './helper';

@Injectable()
export class AuthMiddleware implements NestMiddleware<Request|any, Response> {
    constructor(private readonly authService: AuthService) {}

    async use(req: Request|any, res: Response, next: Function) {

        const token = getJwt(req);
        if (!token) {
          next();
          return;
        }
        const jwtData = await this.authService.decodeJwt(token);
        if (!jwtData) {
          next();
          return;
        }
        req.clientId = jwtData.clientId;
        next();
    }
}