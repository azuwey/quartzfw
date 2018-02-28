import 'reflect-metadata';

import { Extended, METHODS_KEYS, Simple } from '../misc';
import { AddRequest } from './request.decorator';

export function PutDecorator(endpoint: string = '') {
	return (
		target: Object,
		propertyKey: string,
		descriptor: Simple | Extended
	) => {
		if (descriptor.value) {
			AddRequest(descriptor.value, target.constructor,
				METHODS_KEYS. PUT_METHODS_KEY, 'PUT', endpoint);
		} else {
			throw new Error('There is no descriptor');
		}
	}
}