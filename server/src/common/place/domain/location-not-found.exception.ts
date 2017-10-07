import { HttpException } from '@nestjs/core';
import { HttpStatus } from '@nestjs/common';

export class LocationNotFoundException extends HttpException {
    constructor(locationId: string) {
        super(`No location found with id ${locationId}`, HttpStatus.NOT_FOUND);
    }
}
