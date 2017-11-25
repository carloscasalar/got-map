import { HttpException } from '@nestjs/core';
import { HttpStatus } from '@nestjs/common';

export class LocationNotFoundException extends HttpException {
    constructor(locationIdOrType: string) {
        super(`No location found with id/type ${locationIdOrType}`, HttpStatus.NOT_FOUND);
    }
}
