import type { IContext2d } from '../../../interface/context';
import type { IGraphic, IGraphicAttribute } from '../../../interface/graphic';
import type { IMarkAttribute, IThemeAttribute } from '../../../interface/graphic/creator';
import type { IFace3d } from '../../../interface/graphic/face3d';
import type { IDirectionLight } from '../../../interface/light';
import { BaseRender } from './base-render';
export declare abstract class Base3dRender<T extends IGraphic> extends BaseRender<T> {
    stroke(x: number, y: number, z: number, face3d: IFace3d, context: IContext2d): void;
    fill(x: number, y: number, z: number, face3d: IFace3d, faces: [boolean, boolean, boolean, boolean, boolean, boolean] | undefined, fillColor: string, context: IContext2d, light: IDirectionLight, graphic3d: T | undefined, graphic3dAttribute: Partial<IMarkAttribute & IGraphicAttribute> | undefined, fillCb?: (ctx: IContext2d, markAttribute: Partial<IMarkAttribute & IGraphicAttribute>, themeAttribute: IThemeAttribute) => boolean): void;
}
