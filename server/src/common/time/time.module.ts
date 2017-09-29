import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { DbTimeRepository } from './db-time.repository';
import { TimeController } from './time.controller';

@Module({
    modules: [DbModule],
    components: [DbTimeRepository],
    controllers: [TimeController]
})
export class TimeModule {

}