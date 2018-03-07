/**
 * @author David Zarandi (Azuwey)
 */

import { APPLICATION_KEY, METHODS_KEYS } from '../misc';

export function ControllerDecorator(baseEndpoint: string = '') {
	return (constructor: Function) => {
		let timer = setInterval(() => {
			let expressApp = <Express.Application>Reflect
				.getMetadata(APPLICATION_KEY, constructor);
			(expressApp) && (() => {
				clearInterval(timer);
				let events: Array<{
					method: string,
					endpoint: string,
					callback: Function
				}> = [];
				Object.keys(METHODS_KEYS).forEach(key => {
					events.push.apply(events, Reflect.getMetadata(METHODS_KEYS[key], constructor))
				});
				let baseUrl = (baseEndpoint === '' || baseEndpoint === '/')
					? '' : `/${baseEndpoint}`;
				let _class = new (<any>constructor);
				events && events.forEach(event => event.method.toUpperCase() === 'PARAM'
					? expressApp[event.method.toLowerCase()](event.endpoint,
						event.callback.bind(_class))
					: expressApp[event.method.toLowerCase()](`${baseUrl}${event.endpoint}`,
						event.callback.bind(_class)));
			})();
		}, 0);
	}
}