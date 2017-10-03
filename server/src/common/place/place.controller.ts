import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { IKingdomBoundary, ILocation, PlaceRepository } from './place.repository';
import { HttpException } from '@nestjs/core';

@Controller()
export class PlaceController {
    constructor(private readonly placeRepository: PlaceRepository) {
    }

    @Get('locations/:type')
    async getLocations(@Param('type') type: string): Promise<IGeosonDTO[]> {
        const results = await this.placeRepository.getLocations(type);
        if (results.length === 0) {
            throw new HttpException('Location not found', HttpStatus.NOT_FOUND);
        }

        // Add row metadata as geojson properties
        const locations = results.map((row) => {
            const geojson: IGeosonDTO = JSON.parse(row.geoson);
            geojson.properties = { name: row.name, type: row.type, id: row.gid };
            return geojson;
        });
        return locations;
    }

    @Get('kingdom-boundaries')
    async getKingdomBoundaries(): Promise<IGeosonDTO[]> {
        const results = await this.placeRepository.getKingdomBoundaries()
        if (results.length === 0) {
            throw new HttpException('Kingdom boundaries not found', HttpStatus.NOT_FOUND);
        }

        const boundaries = results.map((row) => {
            const geojson: IGeosonDTO = JSON.parse(row.geoson);
            geojson.properties = { name: row.name, id: row.gid };
            return geojson;
        });

        return boundaries;
    }
}

interface IGeosonDTO {
    properties: IGeosonProperties;
}
interface IGeosonProperties{
    name: string;
    type?: string;
    id: string;
}