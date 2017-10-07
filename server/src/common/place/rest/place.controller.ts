import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { PlaceRepository } from '../persistence/place.repository';
import { KingdomRepository } from '../persistence/kingdom.repository';
import { KingdomsNotFoundException } from '../domain/kingdoms-not-found.exception';
import { BoundariesWrapper } from '../domain/boundaries-wrapper.model';

@Controller()
export class PlaceController {
    constructor(private readonly placeRepository: PlaceRepository,
                private readonly kingdomRepository: KingdomRepository) {
    }

    @Get('locations/:type')
    async getLocations(@Param('type') type: string): Promise<BoundariesWrapper[]> {
        const results = await this.placeRepository.getLocations(type);
        if (results.length === 0) {
            throw new HttpException('Location not found', HttpStatus.NOT_FOUND);
        }

        // Add row metadata as geojson properties
        const locations = results.map((row) => {
            const geojson: BoundariesWrapper = JSON.parse(row.geojson);
            geojson.properties = {name: row.name, type: row.type, id: row.gid};
            return geojson;
        });
        return locations;
    }

    @Get('kingdoms-boundaries')
    async getKingdomsBoundaries(): Promise<BoundariesWrapper[]> {
        const kingdoms = await this.kingdomRepository.getAllKingdoms();
        if (kingdoms.length === 0) {
            throw new KingdomsNotFoundException();
        }

        return kingdoms.map((kingdom) => kingdom.getBoundariesWrapper());
    }
}
