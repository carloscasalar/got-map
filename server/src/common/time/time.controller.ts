import { Controller, Get } from '@nestjs/common';
import { DbTimeRepository, INowResult } from './db-time.repository';

@Controller('time')
export class TimeController {
    constructor(private readonly dbTimeRepository: DbTimeRepository) {
    }

    @Get()
    async getTime(): Promise<INowResult> {
        return this.dbTimeRepository.queryTime();
    }
}
