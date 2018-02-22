import 'reflect-metadata';

import { AddRequest } from './request.decorator';
import { METHODS_KEYS } from '../misc/keys';
import { Param } from '../misc/typedPropertyDescriptors';

export function ParamDecorator(param: string = '') {
	return (
		target: Object,
		propertyKey: string,
		descriptor: Param
	) => {
		if (descriptor.value) {
			AddRequest(descriptor.value, target.constructor,
				METHODS_KEYS.PARAM_METHODS_KEY, 'PARAM', param);
		} else {
			throw new Error('There is no descriptor');
		}
	}
}