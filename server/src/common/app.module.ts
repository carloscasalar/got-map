import { Module, NestModule, RequestMethod } from '@nestjs/common';
import { LogModule } from './log/log.module';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { LoggerMiddleware } from './log/logger.middleware';

@Module({
    modules: [LogModule],
})
export class ApplicationModule implements NestModule {
    configure(consumer: MiddlewaresConsumer): void | MiddlewaresConsumer {
        consumer.apply(LoggerMiddleware).forRoutes(
            { path: '/*', method: RequestMethod.ALL }
        );
    }

}