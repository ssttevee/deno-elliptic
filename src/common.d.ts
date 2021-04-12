export type BinaryInput = string | Uint8Array | number[];

export interface BigNumber {
    clone(): BigNumber;

    toArray(): number[];
    toArrayLike<Constructor extends new (len: number) => ArrayLike<any>>(type: Constructor): InstanceType<Constructor>;

    toString(base?: number | 'hex', padding?: number): string;
}

export type BigNumberInit = BinaryInput | BigNumber;

export interface PointLike {
    x: BigNumber;
    y: BigNumber;
}

export interface Point extends PointLike {
    getX(): BigNumber;
    getY(): BigNumber;

    isInfinity(): boolean;

    encode(): number[];
    encode(enc: 'hex'): string;

    toJSON(): [BigNumber, BigNumber];
    inspect(): string;
}

export type PointInit = BinaryInput | PointLike;
