import { Component, Inject } from '@nestjs/common';
import { Client } from 'pg';
import { DatabaseClient } from '../../db/db';
import { KingdomModelMapper } from '../config/kingdom.model-mapper';
import { IKingdomRepository } from '../domain/kingdom.repository';
import { Kingdom } from '../domain/kingdom.model';
import { KingdomEntity } from './kingdom.entity';

@Component()
export class KingdomRepository implements IKingdomRepository {
    constructor(@Inject(DatabaseClient) private readonly client: Client,
                private readonly modelMapper: KingdomModelMapper) {
    }

    async getAllKingdoms(): Promise<Kingdom[]> {
        const allKingdomsQuery = `
                SELECT ST_AsGeoJSON(geog) as geojson, ST_AREA(geog) as size, name, gid
                FROM kingdoms;`;
        const result: KingdomQueryResult = await this.client.query(allKingdomsQuery);
        return result.rows.map(row => this.modelMapper.toKingdom(row));
    }

    async getKingdomById(id: string): Promise<Kingdom> {
        const kingdomByIdQuery = `
                SELECT ST_AsGeoJSON(geog) as geojson, ST_AREA(geog) as size, name, gid
                FROM kingdoms
                WHERE gid = $1
                LIMIT(1);`;
        const result: KingdomQueryResult = await this.client.query(kingdomByIdQuery, [id]);
        return result.rows[0] ? this.modelMapper.toKingdom(result.rows[0]) : null;
    }
}

interface KingdomQueryResult {
    rows: KingdomEntity[];
}
