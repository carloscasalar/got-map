import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { PlaceRepository } from './persistence/place.repository';
import { PlaceController } from './rest/place.controller';

@Module({
    modules: [DbModule],
    components: [PlaceRepository],
    controllers: [PlaceController]
})
export class PlaceModule {
}
