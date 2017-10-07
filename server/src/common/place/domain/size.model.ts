export class Size {
    public readonly squareKilometers;

    constructor(public readonly squareMetres: number = 0) {
        this.squareKilometers = squareMetres * (10 ** -6);
    }
}
