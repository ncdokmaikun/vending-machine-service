import { Controller, Get } from '@nestjs/common';
import { AppService } from 'src/services/app/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @Get('test-connection')
  async testConnection(): Promise<string> {
    const isConnected = await this.appService.testDbConnection();
    return isConnected
      ? 'Database connection successful'
      : 'Database connection failed';
  }
}
