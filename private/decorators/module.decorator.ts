import 'reflect-metadata';
import feathersSocketIO from '@feathersjs/socketio';

import { APPLICATION_KEY, HTTP_KEY, HTTPS_KEY } from '../misc/keys';
import { Http2SecureServer } from 'http2';
import * as WebSocket from 'ws';
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
				/*let wss = https
					? new WebSocket.Server({ server: https })
					: new WebSocket.Server({ server: http });
				metaData.configure(feathersSocketIO(wss));*/
				/*
				console.log('wss');
				wss.on('connection', (ws, req) => {
					const ip = req.connection.remoteAddress;
					console.log(ip);
					ws.on('message', (message) => {
						console.log(message);
					});
				});*/
			})();
			new (<any>constructor);
		}, 0)
	}
}