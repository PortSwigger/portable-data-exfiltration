import Point from './Point';
export default class PathParser {
    control: Point;
    start: Point;
    current: Point;
    command: string;
    private readonly tokens;
    private i;
    private previousCommand;
    private points;
    private angles;
    constructor(path: string);
    reset(): void;
    isEnd(): boolean;
    isCommandOrEnd(): boolean;
    isRelativeCommand(): boolean;
    getToken(): string;
    getScalar(): number;
    nextCommand(): void;
    getPoint(): Point;
    getAsControlPoint(): Point;
    getAsCurrentPoint(): Point;
    getReflectedControlPoint(): Point;
    makeAbsolute(point: Point): Point;
    addMarker(point: Point, from?: Point, priorTo?: Point): void;
    addMarkerAngle(point: Point, angle: number): void;
    getMarkerPoints(): Point[];
    getMarkerAngles(): number[];
}
//# sourceMappingURL=PathParser.d.ts.map