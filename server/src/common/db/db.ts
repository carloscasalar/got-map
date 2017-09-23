import { Client } from 'pg';
import { LoggerService } from '../log/logger.service';
import { IResolver } from '../../component/nest/iresolver.interface';
import { DbConnectionException } from './db-connection.exception';

export const token: string = 'AsyncDbConnection';

export class Db {

    private client: Client;

    constructor (connectionString: string) {
        this.client = new Client({connectionString});
    }

    private async connect(){
        await this.client.connect();
        return this.client;
    }

    public getResolver(): IResolver<Client>{
        return {
            provide: token,
            useFactory: async (log: LoggerService) => {
                try{
                    const start = Date.now();
                    const connection = await this.connect();
                    const responseTime = Date.now() - start;
                    log.info(`Database connection established - ${responseTime} ms`);
                    return connection;
                }catch (e){
                    log.error('Error while connecting to database', e);
                    throw new DbConnectionException();
                }
            },
            inject: [LoggerService]
        };
    }
}