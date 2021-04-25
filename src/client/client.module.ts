import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { InsuranceModule } from '../apis/insurance';
import { AuthMiddleware } from '../common/auth.middleware';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports:[ConfigModule, InsuranceModule, AuthModule],
    controllers: [ClientController],
    providers: [ClientService]
})
export class ClientModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(ClientController);
    }
}
