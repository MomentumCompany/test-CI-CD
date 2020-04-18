import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { environment } from './environment';

export const databaseConfig:TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL || environment.url,
  synchronize: true,
  logging: false,
  ssl: {
    rejectUnauthorized: false
  },
  autoLoadEntities: true
};
