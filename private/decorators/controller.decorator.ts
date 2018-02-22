import 'reflect-metadata';

import { APPLICATION_KEY, METHODS_KEYS } from '../misc/keys';

export function ControllerDecorator(baseEndpoint: string = '') {
	return (constructor: Function) => {
		let timer = setInterval(() => {
			let keys = Reflect.getMetadataKeys(constructor);
			let expressApp = <Express.Application>Reflect
				.getMetadata(APPLICATION_KEY, constructor);
			(expressApp) && (() => {
				clearInterval(timer);
				let events: Array<{
					method: string,
					endpoint: String,
					callback: Function
				}> = [];
				Object.keys(METHODS_KEYS).forEach(key => {
					events.push.apply(events, Reflect.getMetadata(METHODS_KEYS[key], constructor))
				});
				let baseUrl = (baseEndpoint === '' || baseEndpoint === '/')
					? '' : `/${baseEndpoint}`;
				events && events.forEach(event => event.method.toUpperCase() === 'PARAM'
					? expressApp[event.method.toLowerCase()](event.endpoint, event.callback)
					: expressApp[event.method.toLowerCase()](`${baseUrl}${event.endpoint}`
						, event.callback));
			})();
		}, 0);
	}
}