import { Controller, Get, Param } from '@nestjs/common';
import { LocationRepository } from '../persistence/location.repository';
import { KingdomRepository } from '../persistence/kingdom.repository';
import { KingdomsNotFoundException } from '../domain/kingdoms-not-found.exception';
import { Location } from '../domain/location.model';
import { LocationNotFoundException } from '../domain/location-not-found.exception';
import { Count } from '../domain/kingdom.repository';
import { IdValidatorPipe } from './validators/id.validator';
import { LocationType } from '../domain/location-type.enum';
import { LocationTypeValidatorPipe } from './validators/type.validator';

@Controller()
export class PlaceController {
    constructor(private readonly locationRepository: LocationRepository,
                private readonly kingdomRepository: KingdomRepository) {
    }

    @Get('locations/:type')
    async getLocations(@Param('type', new LocationTypeValidatorPipe()) type: LocationType): Promise<Location[]> {
        const locations = await this.locationRepository.getLocations(type);
        if (locations.length === 0) {
            throw new LocationNotFoundException(type);
        }

        return locations;
    }

    @Get('locations/:id/summary')
    async getLocationSummary(@Param('id', new IdValidatorPipe()) id: string): Promise<string>  {
        const location = await this.locationRepository.getLocationById(id);
        if (!location) {
            throw new LocationNotFoundException(id);
        }

        return location.summary;
    }

    @Get('kingdoms-boundaries')
    async getKingdomsBoundaries(): Promise<Location[]> {
        const kingdoms = await this.kingdomRepository.getAllKingdoms();
        if (kingdoms.length === 0) {
            throw new KingdomsNotFoundException();
        }

        return kingdoms.map((kingdom) => kingdom.getLocation());
    }

    @Get('kingdoms/:id/size')
    async getKingdomSize(@Param('id', new IdValidatorPipe()) id: string): Promise<number> {
        const kingdom = await this.kingdomRepository.getKingdomById(id);
        if (!kingdom) {
            throw new KingdomsNotFoundException();
        }

        return kingdom.size.squareKilometers;
    }

    @Get('kingdoms/:id/summary')
    async getKingdomSummary(@Param('id', new IdValidatorPipe()) id: string): Promise<string> {
        const kingdom = await this.kingdomRepository.getKingdomById(id);
        if (!kingdom) {
            throw new KingdomsNotFoundException();
        }

        return kingdom.summary;
    }

    @Get('kingdoms/:id/castles')
    async countCastlesInKingdom(@Param('id', new IdValidatorPipe()) id: string): Promise<Count> {
        const count = await this.kingdomRepository.countLocationsByKingdom(id, 'castle');

        return count;
    }
}
