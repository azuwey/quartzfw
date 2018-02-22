import 'reflect-metadata';

import { APPLICATION_KEY, SSL_CERTS_KEY, HTTP_KEY, HTTPS_KEY } from '../misc/keys';
import { Http2SecureServer } from 'http2';
import * as SocketIO from 'socket.io';
import * as Http from 'http';
import * as Https from 'https';

type ModuleDecoratorParam = {
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
				//let socketio: SocketIO.Server = https ? SocketIO(https) : SocketIO(http);
				let certs = Reflect.getMetadata(SSL_CERTS_KEY, constructor);
				let socketio: SocketIO.Server = certs ? SocketIO(https, certs) : SocketIO(http);
				
			})();
			new (<any>constructor);
		}, 0)
	}
}