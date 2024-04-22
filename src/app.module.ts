import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ControllerModule } from './controllers/controller.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'api',
      database: 'vending_machine_db',
      models: [__dirname + '/**/repositories/model/*.model.ts'],
      autoLoadModels: true,
      synchronize: true,
    }),
    ControllerModule,
  ],
})
export class AppModule {}
