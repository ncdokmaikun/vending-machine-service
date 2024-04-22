import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class DatabaseService {
  constructor(private readonly sequelize: Sequelize) {}

  async testConnection(): Promise<boolean> {
    try {
      await this.sequelize.authenticate();
      console.log('Connection to database successful.');
      return true;
    } catch (error) {
      console.error('Error connecting to database:', error);
      return false;
    }
  }
}
