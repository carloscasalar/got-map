import { CoordinateType } from './coordinate-type.enum';
import { LocationType } from './location-type.enum';

export interface Location {
    type?: CoordinateType;
    coordinates?: number[]|Array<Array<number>>;
    properties: LocationProperties;
}

interface LocationProperties {
    id: string;
    type?: LocationType;
    name: string;
}
