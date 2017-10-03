import { Component, Inject } from '@nestjs/common';
import { DatabaseClient } from '../db/db';
import { Client } from 'pg';

@Component()
export class PlaceRepository {
    constructor(@Inject(DatabaseClient) private client: Client) {
    }

    async getLocations(type: string): Promise<ILocation[]> {
        const locationQuery = `
                SELECT ST_AsGeoJSON(geog) as geoson, name, type, gid
                FROM locations
                WHERE UPPER(type) = UPPER($1);`;
        const {rows} = await this.client.query(locationQuery, [type]);
        return rows;
    }

    async getKingdomBoundaries(): Promise<IKingdomBoundary[]> {
        const boundaryQuery = `
                SELECT ST_AsGeoJSON(geog) as geoson, name, gid
                FROM kingdoms;`;
        const {rows} = await this.client.query(boundaryQuery);
        return rows;
    }
}

export interface ILocation {
    geoson: string;
    name: string;
    type: string;
    gid: string;
}

export interface IKingdomBoundary {
    geoson: string;
    name: string;
    gid: string;
}
