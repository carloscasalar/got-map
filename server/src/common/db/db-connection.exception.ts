import { HttpException } from '@nestjs/core';
import { HttpStatus } from '@nestjs/common';

export class DbConnectionException extends HttpException {
    constructor() {
        super('Database connection failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
