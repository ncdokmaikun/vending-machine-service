import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from 'src/config/config.module';
import { DbConfig } from 'src/config/db.config';

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [DbConfig],
      useFactory: (dbConfig: DbConfig) => ({
        models: [__dirname + '/**/repositories/model/*.model.ts'],
        dialect: dbConfig.dialect,
        host: dbConfig.host,
        port: dbConfig.port,
        username: dbConfig.username,
        password: dbConfig.password,
        database: dbConfig.database,
        autoLoadModels: true,
        synchronize: true,
      }),
    }),
  ],
})
export class DbModule {}
