import { Component } from '@nestjs/common';
import { Kingdom } from '../domain/kingdom.model';
import { Boundaries } from '../domain/boundaries.model';
import { KingdomEntity } from '../persistence/kingdom.entity';
import { LocationEntity } from '../persistence/location.entity';
import { Location } from '../domain/location.model';
import { LocationType } from '../domain/location-type.enum';

@Component()
export class LocationModelMapper {
    public toLocation(locationEntity: LocationEntity): Location {
        const id = locationEntity.gid;
        const name = locationEntity.name;
        const type: LocationType = LocationType[locationEntity.type];
        const properties = {id, name, type};

        const boundaries = new Boundaries(locationEntity.geojson);

        return Object.assign({}, boundaries, {properties});
    }
}
