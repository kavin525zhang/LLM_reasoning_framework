import type { NiceOptions } from './interface';
export declare class LogNiceMixin {
    protected _domain: number[];
    protected _domainValidator?: (val: number) => boolean;
    protected _niceDomain: number[];
    nice(count?: number, option?: NiceOptions): this;
    niceMin(): this;
    niceMax(): this;
}
