import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { PlaceRepository } from './place.repository';

@Controller()
export class PlaceController {
    constructor(private readonly placeRepository: PlaceRepository) {
    }

    @Get('locations/:type')
    async getLocations(@Param('type') type: string): Promise<IGeoJSON[]> {
        const results = await this.placeRepository.getLocations(type);
        if (results.length === 0) {
            throw new HttpException('Location not found', HttpStatus.NOT_FOUND);
        }

        // Add row metadata as geojson properties
        const locations = results.map((row) => {
            const geojson: IGeoJSON = JSON.parse(row.geojson);
            geojson.properties = { name: row.name, type: row.type, id: row.gid };
            return geojson;
        });
        return locations;
    }

    @Get('kingdoms-boundaries')
    async getKingdomsBoundaries(): Promise<IGeoJSON[]> {
        const results = await this.placeRepository.getKingdomBoundaries();
        if (results.length === 0) {
            throw new HttpException('Kingdom boundaries not found', HttpStatus.NOT_FOUND);
        }

        const boundaries = results.map((row) => {
            const geojson: IGeoJSON = JSON.parse(row.geojson);
            geojson.properties = { name: row.name, id: row.gid };
            return geojson;
        });

        return boundaries;
    }
}

export interface IGeoJSON {
    properties: IGeoJSONProperties;
}
interface IGeoJSONProperties{
    name: string;
    type?: string;
    id: string;
}