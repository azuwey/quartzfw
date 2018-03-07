/**
 * @author David Zarandi (Azuwey)
 */

import { NextFunction, Request, Response } from 'express';

import { METHODS_KEYS } from '../misc';
import { AddRequest } from './request.decorator';

export function ParamDecorator(param: string = '') {
	return (
		target: Object,
		propertyKey: string,
		descriptor: TypedPropertyDescriptor<(req: Request,
			res: Response, next: NextFunction, param: any) => void>
	) => {
		if (descriptor.value) {
			AddRequest(descriptor.value, target.constructor,
				METHODS_KEYS.PARAM_METHODS_KEY, 'PARAM', param);
		} else {
			throw new Error('There is no descriptor');
		}
	}
}