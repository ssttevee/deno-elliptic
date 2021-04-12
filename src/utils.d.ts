import { BinaryInput, BigNumber, BigNumberInit } from './common.d.ts';

export function assert(val: any, msg?: string): void;
export function toArray(msg?: number[] | string, enc?: string): number[];
export function zero2(word: string): string;
export function toHex(msg: number[]): string;
export function encode(arr: number[]): number[];
export function encode(arr: number[], enc: 'hex'): string;

/**
 * Represent num in a w-NAF form
 */
export function getNAF(num: BigNumber, w: number, bits: number): number[];

/**
 * Represent k1, k2 in a Joint Sparse Form
 */
export function getJSF(k1: BigNumber, k2: BigNumber): [[], []];

export function cachedProperty(obj: object, name: string, computer: (this: typeof obj) => any): void;
export function parseBytes(bytes: BinaryInput): Uint8Array | number[];
export function intFromLE(bytes: BigNumberInit): BigNumber;
