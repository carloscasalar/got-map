import { Middleware, NestMiddleware, ExpressMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from './logger.service';

@Middleware()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private log: LoggerService) {
    }

    resolve(...args: any[]): ExpressMiddleware {
        return async (req: Request, res: Response, next: NextFunction) => {
            const start = Date.now();
            await next(); // This will pause this function until the endpoint handler has resolved
            const responseTime = Date.now() - start;
            this.log.info(`${req.method} ${res.statusCode} ${req.originalUrl} - ${responseTime} ms`);
        };
    }
}
