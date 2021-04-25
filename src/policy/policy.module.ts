import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PolicyController } from './policy.controller';
import { PolicyService } from './policy.service';
import { InsuranceModule } from '../apis/insurance';
import { AuthMiddleware } from '../common/auth.middleware';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports:[ConfigModule, InsuranceModule, AuthModule],
    controllers: [PolicyController],
    providers: [PolicyService]
})
export class PolicyModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(PolicyController);
    }
}
