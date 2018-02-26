import 'reflect-metadata';

import { APPLICATION_KEY, INCOME_SOCKET_KEY, SOCKET_SERVER_KEY } from '../misc/keys';
import * as Ws from 'ws';
import * as Http from 'http';

export function GatewayDecorator(baseEndpoint: string = '') {
	return (constructor: Function) => {
		let timer = setInterval(() => {
			let keys = Reflect.getMetadataKeys(constructor);
			let expressApp = <Express.Application>Reflect
				.getMetadata(APPLICATION_KEY, constructor);
			expressApp && (() => {
				clearInterval(timer);
			})();
		}, 2);
	}
}