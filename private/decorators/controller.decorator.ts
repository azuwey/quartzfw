import 'reflect-metadata';

import { GET_METHODS_KEY, APPLICATION_KEY } from './keys';

const DEFAULT_PORT: number = 80;

export function ControllerDecorator(baseEnpoint: string = '') {
	return (constructor: Function) => {
		let timer = setInterval(() => {
			let keys = Reflect.getMetadataKeys(constructor);
			let expressApp = <Express.Application>Reflect
				.getMetadata(APPLICATION_KEY, constructor);
			(expressApp) && (() => {
				clearInterval(timer);
				let events = <Array<{
					method: string,
					enpoint: String,
					callback: Function
				}>>Reflect.getMetadata(GET_METHODS_KEY, constructor);
				let baseUrl = (baseEnpoint === '' || baseEnpoint === '/')
					? '' : `/${baseEnpoint}`;
				events.forEach(event => {
					expressApp[event.method.toLocaleLowerCase()](
						`${baseUrl}${event.enpoint}`, event.callback);
				});
			})();
		}, 0);
	}
}
