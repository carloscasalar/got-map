interface IPortResolverOptions {
    defaultPort: number;
}
export class PortResolver {
    constructor(private opts: IPortResolverOptions) { }

    public resolvePort(): number {
        const envPort: any = process.env.PORT || this.opts.defaultPort;
        const intPort = parseInt(envPort, 10);

        if (isNaN(intPort)) {
            throw TypeError('Port should be a number');
        }

        if (intPort >= 0) {
            // port number
            return intPort;
        }

        throw TypeError('Port should be a number bigger than zero');
    }
}
