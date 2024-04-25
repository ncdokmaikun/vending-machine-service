import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ControllerModule } from './controllers/controller.module';
import * as cors from 'cors';
import { DbModule } from '@database/db.module';

@Module({
  imports: [DbModule, ControllerModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes('*');
  }
}
