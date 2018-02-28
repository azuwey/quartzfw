import 'reflect-metadata';

import { SocketEventHandler, WsServerEventDispatcher } from '../misc';
import { APPLICATION_KEY, INCOME_SOCKET_KEY, SOCKET_SERVER_KEY } from '../misc/keys';

export function GatewayDecorator(baseEndpoint: string = '') {
	return (constructor: Function) => {
		let timer = setInterval(() => {
			let keys = Reflect.getMetadataKeys(constructor);
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
				events.forEach(event => wssed.Add(event.endpoint, event.callback));
			})();
		}, 0);
	}
}