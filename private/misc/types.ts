/**
 * @author David Zarandi (Azuwey)
 */

import * as Ws from 'ws';

export type SocketEventHandler = (ws: Ws, ...args: any[]) => void;

export type Income
	= TypedPropertyDescriptor<SocketEventHandler>;

export type IncomingEvent = { eventName: string, eventData: any };