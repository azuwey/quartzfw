/// <reference types="node" />
/**
 * @author David Zarandi (Azuwey)
 */
import * as Http from 'http';
import * as Https from 'https';
import { SocketEventHandler } from '.';
export declare class WsServerEventDispatcher {
    private static _instance;
    private _wss;
    private _events;
    private constructor();
    private _Dispatch();
    Add(eventName: string, eventCallback: SocketEventHandler): void;
    static GetInstance(server?: Http.Server | Https.Server): WsServerEventDispatcher;
}
