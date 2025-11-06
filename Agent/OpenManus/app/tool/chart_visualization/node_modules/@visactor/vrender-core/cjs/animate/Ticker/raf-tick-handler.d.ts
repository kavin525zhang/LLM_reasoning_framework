import type { ITickHandler } from '../../interface/animate';
export declare class RAFTickHandler implements ITickHandler {
    protected released: boolean;
    static Avaliable(): boolean;
    avaliable(): boolean;
    tick(interval: number, cb: (handler: ITickHandler) => void): void;
    release(): void;
    getTime(): number;
}
