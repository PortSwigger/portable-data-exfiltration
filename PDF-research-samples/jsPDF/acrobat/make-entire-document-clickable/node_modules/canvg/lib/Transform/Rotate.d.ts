import { RenderingContext2D } from '../types';
import Document from '../Document';
import Point from '../Point';
export default class Rotate {
    type: string;
    private readonly angle;
    private readonly cx;
    private readonly cy;
    constructor(document: Document, rotate: string, transformOrigin?: number[]);
    apply(ctx: RenderingContext2D): void;
    unapply(ctx: RenderingContext2D): void;
    applyToPoint(point: Point): void;
}
//# sourceMappingURL=Rotate.d.ts.map