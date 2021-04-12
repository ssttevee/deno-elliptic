import { BinaryInput, BigNumber, BigNumberInit, Point, PointInit } from './common.d.ts';
import { base as BaseCurve } from './curve.d.ts';
import { PresetCurve } from './curves.d.ts';

export declare namespace rand {
    export class Rand {
        generate(len: number): Uint8Array;
    }
}

export function rand(len: number): Uint8Array;

export const version: string;

export declare namespace EC {
    export interface SignatureLike {
        r: string;
        s: string;
    }

    export interface Signature {
        r: BigNumber;
        s: BigNumber;

        toDER(): number[];
        toDER(enc: 'hex'): string;
    }

    export type SignatureInit = BinaryInput | Signature | SignatureLike;

    export interface SignOptions {
        pers?: BinaryInput;
        persEnc?: 'hex';
        k?: (iter: number) => BigNumber;
        canonical?: boolean;
    }

    export interface KeyPair {
        getPrivate(): BigNumber;
        getPrivate(enc: 'hex'): string;

        getPublic(): Point;
        getPublic(enc: 'hex'): string;

        validate(): { result: boolean; reason: string };

        derive(pub: Point): BigNumber;
        sign(msgHash: BigNumberInit, options?: SignOptions): Signature;
        verify(msgHash: BigNumberInit, signature: SignatureInit, enc?: 'hex'): boolean;

        inspect(): string;
    }

    export type PrivateKeyInit = BigNumberInit | KeyPair;

    export type PublicKeyInit = PointInit | KeyPair;
    
    export interface GenKeyPairOptions {
        pers?: BinaryInput;
        persEnc?: 'hex';
        entropy?: BinaryInput;
        entropyEnc?: 'hex';
    }

    export interface KeyPairOptions {
        priv?: PrivateKeyInit;
        privEnc?: 'hex';
        pub?: PublicKeyInit;
        pubEnc?: 'hex';
    }
}

export interface EC {
    genKeyPair(options?: EC.GenKeyPairOptions): EC.KeyPair;

    keyPair(options: EC.KeyPairOptions): EC.KeyPair;
    keyFromPrivate(priv: EC.PrivateKeyInit, enc?: 'hex'): EC.KeyPair;
    keyFromPublic(pub: EC.PublicKeyInit, enc?: 'hex'): EC.KeyPair;

    sign(msgHash: BigNumberInit, key: EC.PrivateKeyInit, options?: EC.SignOptions): EC.Signature;
    verify(msgHash: BigNumberInit, signature: EC.SignatureInit, key: EC.PublicKeyInit, enc?: 'hex'): boolean;

    recoverPubKey(msg: BigNumberInit, signature: EC.SignatureInit, j: number, enc?: 'hex'): Point;
    getKeyRecoveryParam(e: BigNumberInit, signature: EC.SignatureInit, Q: Point, enc?: 'hex'): number;
}

export declare namespace EdDSA {
    export interface SignatureLike {
        R: Point | number[] | Uint8Array;
        S: BigNumber | number[] | Uint8Array;
    }

    export interface Signature {
        toHex(): string;
    }

    export type SignatureInit = BinaryInput | Signature | SignatureLike;

    export interface KeyPair {
        sign(msgHash: BinaryInput): Signature;
        verify(msgHash: BinaryInput): boolean;

        secret(): number[];

        pubBytes(): number[];
        pub(): Point;

        privBytes(): number[];
        priv(): BigNumber;

        hash(): number[];

        messagePrefix(): number[];

        getSecret(): number[];
        getSecret(enc: 'hex'): string;

        getPublic(): number[];
        getPublic(enc: 'hex'): string;
    }
}

export interface EdDSA {
    keyFromSecret(secret: BinaryInput): EdDSA.KeyPair;
    keyFromPublic(pub: PointInit): EdDSA.KeyPair;
    makeSignature(sig: EdDSA.SignatureInit): EdDSA.Signature;

    encodePoint(point: Point): number[];
    decodePoint(bytes: BinaryInput): Point;

    encodeInt(num: BigNumber): number[];
    decodeInt(bytes: BinaryInput): BigNumber;

    isPoint(val: any): val is Point;

    hashInt(...data: BinaryInput[]): BigNumber;

    sign(msgHash: BinaryInput, secret: BinaryInput): EdDSA.Signature;
    verify(msgHash: BinaryInput, signature: EdDSA.SignatureInit): boolean;
}

export interface HashOptions {
    outSize: number;
    hmacStrength: number;
}

export interface CurveOptions {
    curve: BaseCurve;
    hash?: HashOptions;
}

interface EllipticConstructor<T> {
    (curve: string | PresetCurve<any> | CurveOptions): T;
    new (curve: string | PresetCurve<any> | CurveOptions): T;
}

export const ec: EllipticConstructor<EC>;

export const EC: EllipticConstructor<EC>;

export const eddsa: EllipticConstructor<EdDSA>;

export const EdDSA: EllipticConstructor<EdDSA>;

export * from './common.d.ts';
export * as utils from './utils.d.ts';
export * as curve from './curve.d.ts';
export * as curves from './curves.d.ts';
