export class Boundaries {

    constructor(geoJsonStr: string = '{}') {
        Object.assign(this, JSON.parse(geoJsonStr));
    }
}
