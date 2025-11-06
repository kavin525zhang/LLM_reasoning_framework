import type { ITickHandler } from '../../interface/animate';
export declare class TimeOutTickHandler implements ITickHandler {
    protected timerId: number;
    static Avaliable(): boolean;
    avaliable(): boolean;
    tick(interval: number, cb: (handler: ITickHandler) => void): void;
    release(): void;
    getTime(): number;
}
