import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Dialect } from 'sequelize';

@Injectable()
export class DbConfig {
  constructor(private readonly configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('DB_HOST', 'localhost');
  }

  get port(): number {
    return this.configService.get<number>('DB_PORT', 5432);
  }

  get username(): string {
    return this.configService.get<string>('DB_USERNAME', 'postgres');
  }

  get password(): string {
    return this.configService.get<string>('DB_PASSWORD', 'api');
  }

  get database(): string {
    return this.configService.get<string>('DB_NAME', 'vending_machine_db');
  }

  get dialect(): Dialect {
    return this.configService.get<Dialect>('DB_DIALECT', 'postgres');
  }
}
