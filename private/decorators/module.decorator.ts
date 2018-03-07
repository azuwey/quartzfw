/**
 * @author David Zarandi (Azuwey)
 */

import * as Http from 'http';
import * as Https from 'https';

import {
	APPLICATION_KEY,
	HTTP_KEY,
	HTTPS_KEY,
	SOCKET_SERVER_KEY,
	WsServerEventDispatcher
} from '../misc';

export type ModuleDecoratorParam = {
	controllers?: Array<Function>,
	gateways?: Array<Function>
}

export function ModuleDecorator(config: ModuleDecoratorParam) {
	return (constructor: Function) => {
		setTimeout(() => {
			let metaData = Reflect.getMetadata(APPLICATION_KEY, constructor);
			config.controllers && config.controllers.forEach(target =>
				Reflect.defineMetadata(APPLICATION_KEY, metaData, target));
			config.gateways && (() => {
				let http: Http.Server = Reflect.getMetadata(HTTP_KEY, constructor);
				let https: Https.Server = Reflect.getMetadata(HTTPS_KEY, constructor);
				SOCKET_SERVER_KEY
				let wssed: WsServerEventDispatcher = https
					? WsServerEventDispatcher.getInstance(https)
					: WsServerEventDispatcher.getInstance(http);
				config.gateways.forEach((target) => {
					Reflect.defineMetadata(SOCKET_SERVER_KEY, wssed, target);
					Reflect.defineMetadata(APPLICATION_KEY, metaData, target);

				});
			})();
			new (<any>constructor);
		}, 0)
	}
}