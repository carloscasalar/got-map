import { TimeController } from './time.controller';
import { DbTimeRepository, INowResult } from './db-time.repository';
import { instance, mock, when } from 'ts-mockito';
import { expect } from 'chai';

describe('Time Controller tests', () => {
    let dbTimeRepositoryMock: DbTimeRepository;
    let timeController: TimeController;

    beforeEach(() => {
        dbTimeRepositoryMock = mock(DbTimeRepository);
    });

    describe('getTime', () => {
        it('should return an array of cats', async () => {
            const result: INowResult = {now: new Date()};

            when(dbTimeRepositoryMock.queryTime()).thenReturn(Promise.resolve(result));
            const dbTimeRepository = instance(dbTimeRepositoryMock);

            timeController = new TimeController(dbTimeRepository);

            expect(await timeController.getTime()).to.be.equal(result);
        });
    });
});
