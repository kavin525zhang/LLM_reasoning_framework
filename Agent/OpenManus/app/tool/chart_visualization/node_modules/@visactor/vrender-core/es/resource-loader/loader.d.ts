import type { ImagePayload } from '../interface';
export declare class ResourceLoader {
    private static cache;
    private static isLoading;
    private static toLoadAueue;
    private static onLoadSuccessCb;
    static GetImage(url: string, mark: ImagePayload): void;
    static GetSvg(svgStr: string, mark: ImagePayload): void;
    static GetFile(url: string, type: 'json' | 'arrayBuffer' | 'blob'): Promise<HTMLImageElement | ImageData | ArrayBuffer | Blob | ImageBitmap | OffscreenCanvas | {
        [id: string]: any;
    }>;
    static loading(): void;
    static loadImage(url: string, mark: ImagePayload): void;
    static improveImageLoading(url: string): void;
    static onLoadSuccess(cb: () => void): void;
}
