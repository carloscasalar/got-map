import { PipeTransform, Pipe, ArgumentMetadata } from '@nestjs/common';
import { InvalidIdException } from './invalid-id.exception';

@Pipe()
export class IdValidatorPipe implements PipeTransform<any> {
    transform(value: any, metadata: ArgumentMetadata) {
        const {type} = metadata;
        if (type !== 'param') {
            return value;
        }

        if (!this.isInteger(value)) {
            throw new InvalidIdException(value);
        }
        return value;
    }

    private isInteger(value: any): boolean {
        return /^\d+$/.test(value);
    }
}
