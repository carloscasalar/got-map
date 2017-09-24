import { Module, NestModule, RequestMethod } from '@nestjs/common';
import { LogModule } from './log/log.module';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { LoggerMiddleware } from './log/logger.middleware';
import { Db } from './db/db';

const database = new Db(process.env.DATABASE_URL);

@Module({
    modules: [LogModule],
    components: [
        database.getResolver()
    ]
})
export class ApplicationModule implements NestModule {
    configure(consumer: MiddlewaresConsumer): void | MiddlewaresConsumer {
        consumer.apply(LoggerMiddleware).forRoutes(
            { path: '/*', method: RequestMethod.ALL }
        );
    }

}