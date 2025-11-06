import type { ITicker, ITickHandler, ITimeline } from '../../interface/animate';
import { DefaultTicker } from './default-ticker';
import type { STATUS, TickerMode } from './type';
export declare class ManualTicker extends DefaultTicker implements ITicker {
    protected interval: number;
    protected tickerHandler: ITickHandler;
    protected _mode: TickerMode;
    protected status: STATUS;
    protected lastFrameTime: number;
    protected tickCounts: number;
    protected timelines: ITimeline[];
    autoStop: boolean;
    set mode(m: TickerMode);
    get mode(): TickerMode;
    protected initHandler(): ITickHandler | null;
    protected setupTickHandler(): boolean;
    tickAt(time: number): void;
    ifCanStop(): boolean;
}
