type CallbackFun = (data: any) => void;
export declare function on(event: string, callback: CallbackFun): void;
export declare function emit(event: string, data?: any): void;
export declare function remove(event: string, callback?: CallbackFun): void;
export {};
