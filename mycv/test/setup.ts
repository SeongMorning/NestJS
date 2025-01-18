import { rm } from 'fs/promises';
import { join } from 'path';
import AppDataSource from '../src/data-source';

global.beforeEach(async () => {
  try {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (err) {}
});
