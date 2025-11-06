import type { FederatedPointerEvent, IGraphic, IGroup } from '@visactor/vrender-core';
export declare const dispatchHoverState: (e: FederatedPointerEvent, container: IGroup, lastHover: IGraphic | null) => IGraphic<Partial<import("@visactor/vrender-core").IGraphicAttribute>>;
export declare const dispatchUnHoverState: (e: FederatedPointerEvent, container: IGroup, lastHover: IGraphic | null) => IGraphic<Partial<import("@visactor/vrender-core").IGraphicAttribute>>;
export declare const dispatchClickState: (e: FederatedPointerEvent, container: IGroup, lastSelect: IGraphic | null) => IGraphic<Partial<import("@visactor/vrender-core").IGraphicAttribute>>;
