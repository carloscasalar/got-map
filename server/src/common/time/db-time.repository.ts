import { Component, Inject } from '@nestjs/common';
import { DatabaseClient } from '../db/db';
import { Client } from 'pg';

export interface INowResult {
    now: number;
}

@Component()
export class DbTimeRepository {
    constructor(@Inject(DatabaseClient) private client: Client) {
    }

    async queryTime(): Promise<INowResult>{
        const { rows } = await this.client.query('SELECT NOW() as now');
        return rows[0];
    }
}