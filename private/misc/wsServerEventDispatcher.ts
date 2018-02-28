import * as Http from 'http';
import * as Https from 'https';
import * as Ws from 'ws';
import { IncomingEvent, SocketEventHandler } from '.';


export class WsServerEventDispatcher {
	private static _instance: WsServerEventDispatcher;
	private _wss: Ws.Server;
	private _events: Map<string, SocketEventHandler> = new Map();

	private constructor(
		server: Http.Server | Https.Server
	) {
		if (WsServerEventDispatcher._instance) {
			throw new Error('Instantiation failed: Use WsServerEventDispatcher.getInstance() instead of new.');
		} else {
			WsServerEventDispatcher._instance = this;
			this._wss = new Ws.Server({ server });
			this._Dispatch();
		}
	}

	private _Dispatch() {
		this._wss.on('connection', (socket: Ws, request: Http.IncomingMessage) => {
			socket.addListener('message', (data: any) => {
				try {
					let event: IncomingEvent = <IncomingEvent>JSON.parse(data);
					let eventHandler = this._events.get(event.eventName);
					if (eventHandler) {
						eventHandler(socket, event.eventData);
					} else {
						throw new Error('Illegal event received');
					}
				} catch (err) {
					console.error(err);
				}
			});
			socket.on('close', (code, reason) => {
				socket.removeAllListeners();
			});
		});
	}

	public Add(
		eventName: string,
		eventCallback: SocketEventHandler,
	): void {
		if (!this._events.has(eventName)) {
			this._events.set(eventName, eventCallback);
		} else {
			throw new Error('This event name already used in the event handler list');
		}
	}

	public static GetInstance(
		server?: Http.Server | Https.Server
	): WsServerEventDispatcher {
		if (WsServerEventDispatcher._instance) {
			return WsServerEventDispatcher._instance;
		} if (!WsServerEventDispatcher._instance && server) {
			return new WsServerEventDispatcher(server);
		} else {
			throw new Error('You have to provide the server parameter.');
		}
	}
}