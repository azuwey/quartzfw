/// <reference types="ws" />
/**
 * @author David Zarandi (Azuwey)
 */
import * as Ws from 'ws';
export declare type SocketEventHandler = (ws: Ws, ...args: any[]) => void;
export declare type Income = TypedPropertyDescriptor<SocketEventHandler>;
export declare type IncomingEvent = {
    eventName: string;
    eventData: any;
};
