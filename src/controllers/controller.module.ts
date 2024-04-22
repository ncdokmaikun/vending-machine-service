import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ApiController } from './api.controller';
import { ServiceModule } from 'src/services';

@Module({
  imports: [ServiceModule],
  controllers: [AppController, ApiController],
})
export class ControllerModule {}
