export interface Location {
    type?: string;
    coordinates?: number[]|Array<Array<number>>;
    properties: LocationProperties;
}

interface LocationProperties {
    name: string;
    type?: string;
    id: string;
}
