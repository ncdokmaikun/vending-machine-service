import { Module } from '@nestjs/common';
import { AppService } from './app/app.service';
import { ProductService } from './product/product.service';
import { RepositoryModule } from '@repositories/repository.module';
import { DatabaseService } from './database/database.service';
import { ChangeService } from './change/change.service';

const services = [AppService, DatabaseService, ProductService, ChangeService];

@Module({
  imports: [RepositoryModule],
  providers: services,
  exports: services,
})
export class ServiceModule {}
