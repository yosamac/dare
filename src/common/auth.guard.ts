import {
  Injectable,
  ExecutionContext,
  CanActivate,
  HttpStatus,
} from '@nestjs/common';
import { ServiceException } from './service.exception';

@Injectable()
export class AuthGuard implements CanActivate {

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        if (!request.clientId){
            throw new ServiceException(
                HttpStatus.UNAUTHORIZED,
                'UNAUTHORIZED'
            );
        }

        return !!request.clientId;
    }
}
