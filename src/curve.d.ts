import { BinaryInput, BigNumber, BigNumberInit, PointLike, Point, PointInit } from './common.d.ts';

export interface BaseCurveOptions {
    p: BigNumberInit;
    prime?: string | BigNumber;
    n?: BigNumberInit;
    g?: PointInit;
    gRed?: boolean;
}

declare abstract class BaseCurve {
    type: string;

    constructor(type: string, options: BaseCurveOptions);

    abstract point(x: BigNumberInit, y: BigNumberInit): Point;
    abstract validate(point: Point): boolean;

    decodePoint(bytes: BinaryInput, enc?: 'hex'): Point;
}

declare namespace BaseCurve {
    export abstract class BasePoint {
        curve: BaseCurve;
        type: string;
    
        constructor(curve: BaseCurve, type: string);
    }
}

export interface ShortCurveOptions extends BaseCurveOptions {
    a: BigNumberInit;
    b: BigNumberInit;
    beta?: BigNumberInit;
    lambda?: BigNumberInit;
    basis?: Array<{ a: BigNumberInit; b: BigNumberInit }>;
}

declare class ShortCurve extends BaseCurve {
    constructor(options: ShortCurveOptions);

    point(x: BigNumberInit, y: BigNumberInit, isRed?: boolean): Point;
    validate(point: Point): boolean;
    pointFromX(x: BigNumberInit, odd?: boolean): Point;
    pointFromJSON(obj: PointLike, red?: boolean): Point;
}

export interface EdwardsCurveOptions extends BaseCurveOptions {
    a: BigNumberInit;
    c: BigNumberInit;
    d: BigNumberInit;
}

declare class EdwardsCurve extends BaseCurve {
    constructor(options: EdwardsCurveOptions);

    point(x: BigNumberInit, y: BigNumberInit, z?: BigNumberInit, t?: BigNumberInit): Point;
    validate(point: Point): boolean;

    pointFromX(x: BigNumberInit, odd?: boolean): Point;
    pointFromY(y: BigNumberInit, odd?: boolean): Point;
    pointFromJSON(obj: PointLike): Point;
}

export interface MontCurveOptions extends BaseCurveOptions {
    a: BigNumberInit;
    b: BigNumberInit;
}

declare class MontCurve extends BaseCurve {
    constructor(options: MontCurveOptions);

    point(x: BigNumberInit, y: BigNumberInit): Point;
    validate(point: Point): boolean;

    pointFromJSON(obj: PointLike): Point;
}

export { BaseCurve as base, ShortCurve as short, EdwardsCurve as edwards, MontCurve as mont };
