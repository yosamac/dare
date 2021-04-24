import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { InsuranceModule } from '../apis/insurance';

@Module({
    imports:[ConfigModule, InsuranceModule],
    controllers: [ClientController],
    providers: [ClientService]
})
export class ClientModule {}
