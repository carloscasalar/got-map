import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { LocationRepository } from './persistence/location.repository';
import { PlaceController } from './rest/place.controller';
import { KingdomModelMapper } from './config/kingdom.model-mapper';
import { KingdomRepository } from './persistence/kingdom.repository';
import { LocationModelMapper } from './config/location.model-mapper';

@Module({
    modules: [DbModule],
    components: [KingdomModelMapper, LocationModelMapper, LocationRepository, KingdomRepository],
    controllers: [PlaceController]
})
export class PlaceModule {
}
