import 'reflect-metadata';

import { METHODS_KEYS, Param } from '../misc';
import { AddRequest } from './request.decorator';

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