import type { ITickHandler } from '../../interface/animate';
export declare class ManualTickHandler implements ITickHandler {
    protected timerId: number;
    protected time: number;
    static Avaliable(): boolean;
    avaliable(): boolean;
    tick(interval: number, cb: (handler: ITickHandler, params?: {
        once: boolean;
    }) => void): void;
    tickTo(t: number, cb: (handler: ITickHandler, params?: {
        once: boolean;
    }) => void): void;
    release(): void;
    getTime(): number;
}
