import { Component, Inject } from '@nestjs/common';
import { Client } from 'pg';
import { DatabaseClient } from '../../db/db';
import { Location } from '../domain/location.model';
import { LocationEntity } from './location.entity';
import { LocationModelMapper } from '../config/location.model-mapper';
import { ILocationRepository } from '../domain/location.repository';
import { LocationType } from '../domain/location-type.enum';

@Component()
export class LocationRepository implements ILocationRepository {
    constructor(@Inject(DatabaseClient) private client: Client,
                private readonly modelMapper: LocationModelMapper) {
    }

    async getLocationById(id: string): Promise<Location> {
        const locationByIdQuery = `
                SELECT ST_AsGeoJSON(geog) as geojson, name, type, gid, summary
                FROM locations
                WHERE gid = $1
                LIMIT(1);`;
        const result: LocationQueryResult = await this.client.query(locationByIdQuery, [id]);
        return result.rows[0] ? this.modelMapper.toLocation(result.rows[0]) : null;
    }

    async getLocations(type: LocationType): Promise<Location[]> {
        const locationQuery = `
                SELECT ST_AsGeoJSON(geog) as geojson, name, type, gid, summary
                FROM locations
                WHERE UPPER(type) = UPPER($1);`;
        const {rows}: LocationQueryResult = await this.client.query(locationQuery, [type]);
        return rows.map(location => this.modelMapper.toLocation(location));
    }
}

export interface LocationQueryResult {
    rows: LocationEntity[];
}
