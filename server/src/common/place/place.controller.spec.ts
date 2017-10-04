import { IGeoJSON, PlaceController } from './place.controller';
import { anyString, instance, mock, when } from 'ts-mockito';
import { expect } from 'chai';
import { IKingdomBoundary, ILocation, PlaceRepository } from './place.repository';

describe('Place Controller tests', () => {
    let placeRepositoryMock: PlaceRepository;
    let placeController: PlaceController;

    beforeEach(() => {
        placeRepositoryMock = mock(PlaceRepository);
    });

    describe('getLocations', () => {
        it('should call get all locations from repository', async () => {
            const result: ILocation = {gid: 'id', geojson: '{}', name: 'Winterfell', type: 'Castle'};

            when(placeRepositoryMock.getLocations(anyString())).thenReturn(Promise.resolve([result]));
            const placeRepository = instance(placeRepositoryMock);

            placeController = new PlaceController(placeRepository);

            const expectedResult: IGeoJSON = {
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
            const result: IKingdomBoundary = {gid: 'id', geojson: '{}', name: 'Winterfell'};

            when(placeRepositoryMock.getKingdomBoundaries()).thenReturn(Promise.resolve([result]));
            const placeRepository = instance(placeRepositoryMock);

            placeController = new PlaceController(placeRepository);

            const expectedResult: IGeoJSON = {
                properties: {
                    id: 'id',
                    name: 'Winterfell'
                }
            };

            expect(await placeController.getKingdomsBoundaries()).to.be.eql([expectedResult]);
        });
    });
});
