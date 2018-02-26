import 'reflect-metadata';

import { INCOME_SOCKET_KEY } from '../misc/keys';
import { Income } from '../misc/typedPropertyDescriptors';

export function IncomeDecorator(eventEndPoint: string) {
	return (
		target: Object,
		propertyKey: string,
		descriptor: Income
	) => {
		if (descriptor.value) {
			let events = <Array<{
				endpoint: String,
				callback: Function
			}>>Reflect.getMetadata(INCOME_SOCKET_KEY, target.constructor) || [];
			if (events.filter(event => event.endpoint === eventEndPoint).length === 0) {
				events.push({
					endpoint: eventEndPoint,
					callback: descriptor.value
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