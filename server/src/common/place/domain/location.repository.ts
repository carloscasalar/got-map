import { Location } from '../domain/location.model';
import { LocationType } from './location-type.enum';

export interface ILocationRepository {
    getLocations(type: LocationType): Promise<Location[]>;

    getLocationById(id: string): Promise<Location>;
}
