import 'reflect-metadata';

import { APPLICATION_KEY } from '../misc/keys';

export function GatewayDecorator(baseEndpoint: string = '') {
	return (constructor: Function) => {
		let timer = setInterval(() => {
			let keys = Reflect.getMetadataKeys(constructor);
			let expressApp = <Express.Application>Reflect
				.getMetadata(APPLICATION_KEY, constructor);
			(expressApp) && (() => {
				clearInterval(timer);
				console.log('set socekt events');
			})();
		}, 0);
	}
}