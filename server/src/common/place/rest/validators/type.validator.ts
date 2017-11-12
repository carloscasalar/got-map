import { PipeTransform, Pipe, ArgumentMetadata } from '@nestjs/common';
import { LocationType } from '../../domain/location-type.enum';
import { InvalidLocationTypeException } from './invalid-location-type.exception';

@Pipe()
export class LocationTypeValidatorPipe implements PipeTransform<any> {
    transform(value: any, metadata: ArgumentMetadata) {
        const {type} = metadata;
        if (type !== 'param') {
            return value;
        }

        if (!this.isValidType(value)) {
            throw new InvalidLocationTypeException(value);
        }
        return value;
    }

    private isValidType(value: any): boolean {
        return value in LocationType;
    }
}
