import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { LoggerModule } from './logger/logger.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load:[configuration]
        }),
        LoggerModule.forRoot({ isGlobal: true }),
        AuthModule
    ]
})
export class MainModule {}
