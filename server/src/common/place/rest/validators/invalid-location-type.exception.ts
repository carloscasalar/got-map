import { HttpException } from '@nestjs/core';
import { HttpStatus } from '@nestjs/common';
import { LocationType } from '../../domain/location-type.enum';

export class InvalidLocationTypeException extends HttpException {
    constructor(id: string) {
        super(`Invalid location type: ${id}. Valid types are ${Object.keys(LocationType).join(', ')}`,
            HttpStatus.BAD_REQUEST);
    }
}
