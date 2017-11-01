import { Location } from '../domain/location.model';

export interface ILocationRepository {
    getLocations(type: string): Promise<Location[]>;
}
