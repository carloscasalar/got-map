import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { PlaceRepository } from './persistence/place.repository';
import { PlaceController } from './rest/place.controller';
import { KingdomModelMapper } from './config/kingdom.model-mapper';
import { KingdomRepository } from './persistence/kingdom.repository';

@Module({
    modules: [DbModule],
    components: [KingdomModelMapper, PlaceRepository, KingdomRepository],
    controllers: [PlaceController]
})
export class PlaceModule {
}
