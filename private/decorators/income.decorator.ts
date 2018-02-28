import 'reflect-metadata';

import { Income, INCOME_SOCKET_KEY, SocketEventHandler } from '../misc';

export function IncomeDecorator(eventEndPoint: string) {
	return (
		target: Object,
		propertyKey: string,
		descriptor: Income
	) => {
		if (descriptor.value) {
			let events = <Array<{
				endpoint: string,
				callback: SocketEventHandler
			}>>Reflect.getMetadata(INCOME_SOCKET_KEY, target.constructor) || [];
			if (events.filter(event => event.endpoint === eventEndPoint).length === 0) {
				let callback = descriptor.value;
				events.push({
					endpoint: eventEndPoint,
					callback: callback
				});
			} else {
				throw new Error('Endpoint is already in the routes');
			}
			Reflect.defineMetadata(INCOME_SOCKET_KEY, events, target.constructor);
		} else {
			throw new Error('There is no descriptor');
		}
	}
}