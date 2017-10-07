import { Component } from '@nestjs/common';
import { Kingdom } from '../domain/kingdom.model';
import { Boundaries } from '../domain/boundaries.model';
import { KingdomEntity } from '../persistence/kingdom.entity';

@Component()
export class KingdomModelMapper {
    public toKingdom(kingdomEntity: KingdomEntity): Kingdom {
        const boundaries: Boundaries = new Boundaries(kingdomEntity.geojson);
        return new Kingdom(kingdomEntity.gid, kingdomEntity.name, boundaries);
    }
}
