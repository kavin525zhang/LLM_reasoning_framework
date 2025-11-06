import { BasePlayer } from './base-player';
import type { DiscretePlayerAttributes, PlayerAttributes } from './type';
import { PlayerEventEnum } from './type';
import type { ComponentOptions } from '../interface';
export declare class DiscretePlayer extends BasePlayer<DiscretePlayerAttributes> {
    attribute: DiscretePlayerAttributes;
    private _activeIndex;
    protected _alternate: boolean;
    protected _interval: number;
    private _isPlaying;
    private _direction;
    private _tickTime;
    private _rafId;
    private _isReachEnd;
    constructor(attributes: DiscretePlayerAttributes, options?: ComponentOptions);
    setAttributes(params: Partial<Required<PlayerAttributes>>, forceUpdateTag?: boolean): void;
    _initAttributes: () => void;
    _initDataIndex: () => void;
    private _initEvents;
    dispatchCustomEvent(event: PlayerEventEnum): void;
    play: () => void;
    private _play;
    private _updateDataIndex;
    private _playEnd;
    pause: () => void;
    backward: () => void;
    forward: () => void;
}
