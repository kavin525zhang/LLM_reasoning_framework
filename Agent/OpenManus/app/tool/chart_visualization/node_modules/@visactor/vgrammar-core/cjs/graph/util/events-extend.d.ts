import type { FederatedEvent } from '@visactor/vrender-core';
import type { IView } from './../../types/view';
import type { EventSourceType } from '../../types';
export default function getExtendedEvents(view: IView, event: FederatedEvent, type: string, source: EventSourceType): FederatedEvent<Event>;
