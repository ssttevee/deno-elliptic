import {
    base as BaseCurve,
    short as ShortCurve,
    edwards as EdwardsCurve,
    mont as MontCurve,
} from './curve.d.ts';

export interface PresetCurveOptions {
    type?: 'short' | 'edwards' | 'mont';
    hash: string;
}

type CurveToType<Curve> =
    Curve extends ShortCurve ? 'short' :
    Curve extends EdwardsCurve ? 'edwards' :
    Curve extends MontCurve ? 'mont' : never;

export class PresetCurve<Curve extends BaseCurve> {
    type: CurveToType<Curve>;

    constructor(options: PresetCurveOptions);
}

export const p192: PresetCurve<ShortCurve>;
export const p224: PresetCurve<ShortCurve>;
export const p256: PresetCurve<ShortCurve>;
export const p384: PresetCurve<ShortCurve>;
export const p521: PresetCurve<ShortCurve>;
export const curve25519: PresetCurve<MontCurve>;
export const ed25519: PresetCurve<EdwardsCurve>;
export const secp256k1: PresetCurve<ShortCurve>;
