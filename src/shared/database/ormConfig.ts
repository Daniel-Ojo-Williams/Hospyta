import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  username: 'freakydmuse',
  password: 'freakydmuse',
  database: 'feed',
  synchronize: false,
  entities: ['dist/src/**/entities/*.js'],
  migrations: ['dist/src/database/migrations/**/*.js'],
};

export const dataSource = new DataSource(dataSourceOptions);
