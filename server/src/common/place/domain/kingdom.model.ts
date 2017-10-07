import { Boundaries } from './boundaries.model';
import { Location } from './location.model';

const defaultBoundaries = new Boundaries();

export class Kingdom {
    constructor(public readonly id: string,
                public readonly name: string,
                public readonly boundaries: Boundaries = defaultBoundaries) {
    }

    public getLocation(): Location {
        const id = this.id;
        const name = this.name;
        const properties = {id, name};
        return Object.assign({}, this.boundaries, {properties});
    }
}
