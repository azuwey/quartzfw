/**
 * @author David Zarandi (Azuwey)
 */

import 'reflect-metadata';

import {
	APPLICATION_KEY,
	INCOME_SOCKET_KEY,
	SOCKET_SERVER_KEY,
	SocketEventHandler,
	WsServerEventDispatcher
} from '../misc';

export function GatewayDecorator(baseEndpoint: string = '') {
	return (constructor: Function) => {
		let timer = setInterval(() => {
			let expressApp = <Express.Application>Reflect
				.getMetadata(APPLICATION_KEY, constructor);
			expressApp && (() => {
				clearInterval(timer);
				let wssed = <WsServerEventDispatcher>Reflect
					.getMetadata(SOCKET_SERVER_KEY, constructor);
				let events = <Array<{
					endpoint: string,
					callback: SocketEventHandler
				}>>Reflect.getMetadata(INCOME_SOCKET_KEY, constructor);
				let _class = new (<any>constructor);
				events.forEach(event => wssed.Add(event.endpoint, event.callback.bind(_class)));
			})();
		}, 0);
	}
}