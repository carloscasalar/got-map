import { Middleware, NestMiddleware, ExpressMiddleware } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Middleware()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private log: LoggerService) { }

    resolve(...args: any[]): ExpressMiddleware {
        return async (req, res, next) => {
            const start = Date.now();
            await next(); // This will pause this function until the endpoint handler has resolved
            const responseTime = Date.now() - start;
            this.log.info(`${req.method} ${res.status} ${req.url} - ${responseTime} ms`);
        };
    }
}
