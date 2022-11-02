import FastGlob from 'fast-glob'
import 'reflect-metadata'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'src/db/db.sql',
  // synchronize: process.env.NODE_ENV === 'development' ? true : false,
  logging: true,
  entities: FastGlob.sync([
    'src/app/domains/**/*.entity.ts',
    'src/db/typeorm/entity/*.ts',
  ]),
  migrations: [],
  subscribers: [],
})
