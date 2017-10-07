import { anyString, instance, mock, when } from 'ts-mockito';
import { expect } from 'chai';
import { Kingdom } from '../domain/kingdom.model';
import { KingdomRepository } from '../persistence/kingdom.repository';
import { ILocation, PlaceRepository } from '../persistence/place.repository';
import { PlaceController } from './place.controller';
import { BoundariesWrapper } from '../domain/boundaries-wrapper.model';

describe('Place Controller tests', () => {
    let placeRepositoryMock: PlaceRepository;
    let kingdomRepositoryMock: KingdomRepository;
    let placeController: PlaceController;

    beforeEach(() => {
        placeRepositoryMock = mock(PlaceRepository);
        kingdomRepositoryMock = mock(KingdomRepository);
    });

    describe('getLocations', () => {
        it('should call get all locations from repository', async () => {
            const result: ILocation = {gid: 'id', geojson: '{}', name: 'Winterfell', type: 'Castle'};

            when(placeRepositoryMock.getLocations(anyString())).thenReturn(Promise.resolve([result]));
            const placeRepository = instance(placeRepositoryMock);
            const kingdomRepository = instance(kingdomRepositoryMock);

            placeController = new PlaceController(placeRepository, kingdomRepository);

            const expectedResult: BoundariesWrapper = {
                properties: {
                    id: 'id',
                    type: 'Castle',
                    name: 'Winterfell'
                }
            };

            expect(await placeController.getLocations('a location')).to.be.eql([expectedResult]);
        });
    });

    describe('getKingdomsBoundaries', () => {
        it('should get all kingdoms boundaries', async () => {
            const result: Kingdom = new Kingdom('id', 'Winterfell');

            when(kingdomRepositoryMock.getAllKingdoms()).thenReturn(Promise.resolve([result]));
            const placeRepository = instance(placeRepositoryMock);
            const kingdomRepository = instance(kingdomRepositoryMock);

            placeController = new PlaceController(placeRepository, kingdomRepository);

            const expectedResult: BoundariesWrapper = {
                properties: {
                    id: 'id',
                    name: 'Winterfell'
                }
            };

            expect(await placeController.getKingdomsBoundaries()).to.be.eql([expectedResult]);
        });
    });
});
