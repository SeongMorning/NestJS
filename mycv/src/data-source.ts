import { DataSource } from 'typeorm';
import { SpannerConnectionOptions } from 'typeorm/driver/spanner/SpannerConnectionOptions';

// 환경별 데이터베이스 설정
const commonConfig = {
  synchronize: false,
  migrations: ['migrations/*.js'],
};

let environmentConfig = {};

switch (process.env.NODE_ENV) {
  case 'development':
    environmentConfig = {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['**/*.entity.js'],
    };
    break;
  case 'test':
    environmentConfig = {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['**/*.entity.ts'],
      migrationsRun: true, // 모든 테스트가 실행될 때마다 모든 마이그레이션을 실행
    };
    break;
  case 'production':
    environmentConfig = {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: ['**/*.entity.js'],
      migrationsRun: true, // 모든 테스트가 실행될 때마다 모든 마이그레이션을 실행
      ssl: {
        rejectUnauthorized: false,
      },
    };
    break;
  default:
    throw new Error('unknown environment');
}

Object.assign(commonConfig, environmentConfig);

const dataSource = new DataSource(commonConfig as SpannerConnectionOptions);

export default dataSource;
