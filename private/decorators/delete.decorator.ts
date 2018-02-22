import 'reflect-metadata';

import { AddRequest } from './request.decorator';
import { METHODS_KEYS } from '../misc/keys';
import { Extended, Simple } from '../misc/typedPropertyDescriptors';

export function DeleteDecorator(endpoint: string = '') {
	return (
		target: Object,
		propertyKey: string,
		descriptor: Simple | Extended
	) => {
		if (descriptor.value) {
			AddRequest(descriptor.value, target.constructor,
				METHODS_KEYS.DELETE_METHODS_KEY, 'DELETE', endpoint);
		} else {
			throw new Error('There is no descriptor');
		}
	}
}