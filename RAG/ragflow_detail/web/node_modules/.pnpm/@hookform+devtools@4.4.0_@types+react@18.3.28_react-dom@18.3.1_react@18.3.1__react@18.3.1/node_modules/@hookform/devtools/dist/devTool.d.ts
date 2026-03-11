import { Control, FieldValues } from 'react-hook-form';
import { DevtoolUIProps } from './devToolUI';
import type { PLACEMENT } from './position';
export declare const DevTool: <T extends FieldValues>(props?: ({
    id?: string | undefined;
    control?: Control<T, any, T> | undefined;
} & Pick<DevtoolUIProps, "placement" | "styles">) | undefined) => JSX.Element | null;
export type { PLACEMENT };
