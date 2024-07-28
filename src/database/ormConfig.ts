import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: process.env.Type as 'postgres',
  host: process.env.Host,
  username: process.env.Username,
  password: process.env.Password,
  database: process.env.DB,
  synchronize: false,
  entities: ['dist/module/**/entities/*.js'],
  migrations: ['dist/database/migrations/*.js'],
};

export const dataSource = new DataSource(dataSourceOptions);
