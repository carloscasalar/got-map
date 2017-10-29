import { Kingdom } from './kingdom.model';

export interface IKingdomRepository {
    getAllKingdoms(): Promise<Kingdom[]>;

    getKingdomById(id: string): Promise<Kingdom>;
}
