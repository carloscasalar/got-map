import { HttpException } from '@nestjs/core';
import { HttpStatus } from '@nestjs/common';

export class KingdomsNotFoundException extends HttpException {
    constructor() {
        super('Kingdoms not found', HttpStatus.NOT_FOUND);
    }
}
