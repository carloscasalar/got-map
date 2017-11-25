import { Boundaries } from './boundaries.model';
import { Location } from './location.model';
import { Size } from './size.model';

const defaultBoundaries = new Boundaries();

export class Kingdom {
    constructor(public readonly id: string,
                public readonly name: string,
                public readonly size: Size,
                public readonly summary: string,
                public readonly boundaries: Boundaries = defaultBoundaries) {
    }

    public getLocation(): Location {
        const id = this.id;
        const name = this.name;
        const properties = {id, name};
        const summary = this.summary;
        return Object.assign({}, {summary}, this.boundaries, {properties});
    }
}
