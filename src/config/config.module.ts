import { Module } from '@nestjs/common';
import {
  ConfigService,
  ConfigModule as NestJsConfigModule,
} from '@nestjs/config';
import { DbConfig } from './db.config';

@Module({
  imports: [NestJsConfigModule.forRoot({ cache: true })],
  providers: [ConfigService, DbConfig],
  exports: [ConfigService, DbConfig],
})
export class ConfigModule {}
