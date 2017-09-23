export interface IResolver<T> {
    provide: string;
    useValue?: any;
    useFactory?(any): Promise<T>;
    inject?: Array<any>;
}