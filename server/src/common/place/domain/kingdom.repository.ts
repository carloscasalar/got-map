import { Kingdom } from './kingdom.model';

export interface IKingdomRepository {
    getAllKingdoms(id: number): Promise<Kingdom[]>;
}
