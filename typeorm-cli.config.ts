import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv?.config({ path: '.env' });

const config = {
  development: {
    type: 'postgres',
    host: process?.env?.DATABASE_HOST_DEV,
    port: parseInt(process?.env?.DATABASE_PORT_DEV, 10),
    database: process?.env?.DATABASE_NAME_DEV,
    username: process?.env?.DATABASE_USER_DEV,
    password: process?.env?.DATABASE_PASSWORD_DEV,
    logging: true,
    entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    migrations: [join(__dirname, 'src/database/migrations/', '*.{ts,js}')],
    migrationsTableName: 'migrations',
  },
};

export default new DataSource(config[process?.env?.NODE_ENV]);
