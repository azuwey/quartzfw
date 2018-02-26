import 'reflect-metadata';

import * as Http from 'http';
import * as Https from 'https';
import * as Ws from 'ws';

import { APPLICATION_KEY, HTTP_KEY, HTTPS_KEY, SOCKET_SERVER_KEY, INCOME_SOCKET_KEY } from '../misc/keys';

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
				let wss = https
					? new Ws.Server({ server: https })
					: new Ws.Server({ server: http });
				wss.on('connection', (socket, request) => {
					socket.on('message', (data: Ws.Data) => {
						config.gateways && config.gateways.forEach((target) => {
							let events = <Array<{
								endpoint: String,
								callback: Function
							}>>Reflect.getMetadata(INCOME_SOCKET_KEY, target) || [];
							events.forEach(event => {
								let serverDate = new Date();
								console.log(
									Number.parseInt(data.toString()) - serverDate.getTime());
								socket.send(serverDate.getTime().toString());
							});
						});
					});
					/*socket.addListener('message', event => {
						console.log('mess')
					});*/
					/*let timer = setInterval(() => {
						let events = <Array<{
							endpoint: String,
							callback: Function
						}>>Reflect.getMetadata(INCOME_SOCKET_KEY, constructor) || [];
					}, 2);*/
				});
				
				config.gateways.forEach((target) => {
					Reflect.defineMetadata(APPLICATION_KEY, metaData, target);
					
				});
			})();
			new (<any>constructor);
		}, 0)
	}
}