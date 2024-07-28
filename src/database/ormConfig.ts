import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

export const dataSourceOptions: DataSourceOptions = {
  type: process.env.DB_Type as 'postgres',
  host: process.env.DB_Host,
  username: process.env.DB_Username,
  password: process.env.DB_Password,
  port: (process.env.DB_Port as unknown as number) || 5432,
  database: process.env.DB_Name,
  synchronize: false,
  entities: ['dist/module/**/entities/*.js'],
  migrations: ['dist/database/migrations/*.js'],
};

export const dataSource = new DataSource(dataSourceOptions);
