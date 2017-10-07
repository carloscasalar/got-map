import { Controller, Get, Param } from '@nestjs/common';
import { LocationRepository } from '../persistence/location.repository';
import { KingdomRepository } from '../persistence/kingdom.repository';
import { KingdomsNotFoundException } from '../domain/kingdoms-not-found.exception';
import { Location } from '../domain/location.model';
import { LocationNotFoundException } from '../domain/location-not-found.exception';

@Controller()
export class PlaceController {
    constructor(private readonly locationRepository: LocationRepository,
                private readonly kingdomRepository: KingdomRepository) {
    }

    @Get('locations/:type')
    async getLocations(@Param('type') type: string): Promise<Location[]> {
        const locations = await this.locationRepository.getLocations(type);
        if (locations.length === 0) {
            throw new LocationNotFoundException(type);
        }

        return locations;
    }

    @Get('kingdoms-boundaries')
    async getKingdomsBoundaries(): Promise<Location[]> {
        const kingdoms = await this.kingdomRepository.getAllKingdoms();
        if (kingdoms.length === 0) {
            throw new KingdomsNotFoundException();
        }

        return kingdoms.map((kingdom) => kingdom.getLocation());
    }
}
