import { Kingdom } from './kingdom.model';

export interface IKingdomRepository {
    getAllKingdoms(): Promise<Kingdom[]>;

    getKingdomById(id: string): Promise<Kingdom>;

    countLocationsByKingdom(kingdomId: string, locationType: string): Promise<Count>;
}

export interface Count {
    count: number;
}
