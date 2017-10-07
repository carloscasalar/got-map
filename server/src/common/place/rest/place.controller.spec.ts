import { anyString, instance, mock, when } from 'ts-mockito';
import { expect } from 'chai';
import { Kingdom } from '../domain/kingdom.model';
import { KingdomRepository } from '../persistence/kingdom.repository';
import { LocationRepository } from '../persistence/location.repository';
import { PlaceController } from './place.controller';
import { Location } from '../domain/location.model';
import { Boundaries } from '../domain/boundaries.model';

describe('Place Controller tests', () => {
    let locationRepositoryMock: LocationRepository;
    let kingdomRepositoryMock: KingdomRepository;
    let placeController: PlaceController;

    beforeEach(() => {
        locationRepositoryMock = mock(LocationRepository);
        kingdomRepositoryMock = mock(KingdomRepository);
    });

    describe('getLocations', () => {
        it('should call get all locations from repository', async () => {
            const result: Location = {
                type: 'Point',
                coordinates: [
                    14.3312151315039,
                    -6.02925834324263
                ],
                properties: {
                    id: 'id',
                    name: 'Winterfell',
                    type: 'Castle'
                }
            };

            const expectedResult = Object.assign({}, result, {coordinates: [...result.coordinates]});

            when(locationRepositoryMock.getLocations(anyString())).thenReturn(Promise.resolve([result]));
            const locationRepository = instance(locationRepositoryMock);
            const kingdomRepository = instance(kingdomRepositoryMock);

            placeController = new PlaceController(locationRepository, kingdomRepository);

            expect(await placeController.getLocations('a location')).to.be.eql([expectedResult]);
        });
    });

    describe('getKingdomsBoundaries', () => {
        it('should get all kingdoms boundaries', async () => {
            const boundaries = new Boundaries(`{
                "type": "MultiPolygon",
                "coordinates": [
                    [1, 2],
                    [3, 4],
                    [5, 6]
                ]
            }`);
            const result: Kingdom = new Kingdom('id', 'Winterfell', boundaries);

            when(kingdomRepositoryMock.getAllKingdoms()).thenReturn(Promise.resolve([result]));
            const placeRepository = instance(locationRepositoryMock);
            const kingdomRepository = instance(kingdomRepositoryMock);

            placeController = new PlaceController(placeRepository, kingdomRepository);

            const expectedResult: Location = {
                type: 'MultiPolygon',
                coordinates: [
                    [1, 2],
                    [3, 4],
                    [5, 6]
                ],
                properties: {
                    id: 'id',
                    name: 'Winterfell'
                }
            };

            expect(await placeController.getKingdomsBoundaries()).to.be.eql([expectedResult]);
        });
    });
});
