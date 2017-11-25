import { Component } from '@nestjs/common';
import { Kingdom } from '../domain/kingdom.model';
import { Boundaries } from '../domain/boundaries.model';
import { KingdomEntity } from '../persistence/kingdom.entity';
import { Size } from '../domain/size.model';

@Component()
export class KingdomModelMapper {
    public toKingdom(kingdomEntity: KingdomEntity): Kingdom {
        const boundaries: Boundaries = new Boundaries(kingdomEntity.geojson);
        const size: Size = new Size(kingdomEntity.size);
        return new Kingdom(kingdomEntity.gid, kingdomEntity.name, size, kingdomEntity.summary, boundaries);
    }
}
