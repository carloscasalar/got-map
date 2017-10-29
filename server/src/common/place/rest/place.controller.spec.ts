import { anyString, instance, mock, when } from 'ts-mockito';
import { expect } from 'chai';
import { Kingdom } from '../domain/kingdom.model';
import { KingdomRepository } from '../persistence/kingdom.repository';
import { LocationRepository } from '../persistence/location.repository';
import { PlaceController } from './place.controller';
import { Location } from '../domain/location.model';
import { Boundaries } from '../domain/boundaries.model';
import { Size } from '../domain/size.model';
import { KingdomsNotFoundException } from '../domain/kingdoms-not-found.exception';

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
            const size: Size = new Size(10);
            const result: Kingdom = new Kingdom('id', 'Winterfell', size, boundaries);

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

    describe('getKingdomSize', () => {
        let WINTERFELL_ID;
        beforeEach('setting common constants', () => {
            WINTERFELL_ID = 'id';
        });

        it('should return kingdom size in Km2', async () => {
            const boundaries = new Boundaries(`{}`);
            const ONE_MILLION_SQUARE_METERS: Size = new Size(10 ** 6);
            const winterfell: Kingdom = new Kingdom(WINTERFELL_ID, 'Winterfell', ONE_MILLION_SQUARE_METERS, boundaries);

            when(kingdomRepositoryMock.getKingdomById(WINTERFELL_ID)).thenReturn(Promise.resolve(winterfell));
            const placeRepository = instance(locationRepositoryMock);
            const kingdomRepository = instance(kingdomRepositoryMock);

            placeController = new PlaceController(placeRepository, kingdomRepository);

            expect(await placeController.getKingdomSize(WINTERFELL_ID)).to.be.equal(1, 'size should be 1 Km2');
        });

        it('should throw a KingdomNotFoundException if no kingdom is found', async () => {
            when(kingdomRepositoryMock.getKingdomById(WINTERFELL_ID)).thenReturn(Promise.resolve(null));
            const placeRepository = instance(locationRepositoryMock);
            const kingdomRepository = instance(kingdomRepositoryMock);

            placeController = new PlaceController(placeRepository, kingdomRepository);

            try {
                await placeController.getKingdomSize(WINTERFELL_ID);
                throw new Error('should fail with Kingdom not found exception');
            } catch (e) {
                expect(e).to.be.an.instanceof(KingdomsNotFoundException);
            }
        });
    });
});
