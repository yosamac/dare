import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PolicyController } from './policy.controller';
import { PolicyService } from './policy.service';
import { InsuranceModule } from '../apis/insurance';

@Module({
    imports:[ConfigModule, InsuranceModule],
    controllers: [PolicyController],
    providers: [PolicyService]
})
export class PolicyModule {}
