import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { DataSource } from 'typeorm';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.PGHOST || 'localhost',
  port: parseInt(process.env.PGPORT)  ||  5432,
  username: process.env.PGUSER ||  'bonsaicorner',
  password: process.env.PGPASSWORD ||'admin123',
  database: process.env.PGDATABASE || 'bonsaicorner',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
};

export default new DataSource(config);
