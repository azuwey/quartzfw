import 'reflect-metadata';

import { AddRequest } from './request.decorator';
import { METHODS_KEYS } from '../misc/keys';
import { Extended, Simple } from '../misc/typedPropertyDescriptors';

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