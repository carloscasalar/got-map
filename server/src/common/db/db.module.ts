import { Module } from '@nestjs/common';
import { LogModule } from '../log/log.module';
import { Db } from './db';

const database = new Db(process.env.DATABASE_URL);
const DatabaseClient = database.getResolver();

@Module({
    modules: [LogModule],
    components: [
        DatabaseClient
    ],
    exports: [DatabaseClient]
})
export class DbModule {
}
