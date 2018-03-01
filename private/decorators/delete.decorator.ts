/**
 * @author David Zarandi (Azuwey)
 */

import 'reflect-metadata';

import { NextFunction, Request, Response } from 'express';

import { METHODS_KEYS } from '../misc';
import { AddRequest } from './request.decorator';


export function DeleteDecorator(endpoint: string = '') {
	return (
		target: Object,
		propertyKey: string,
		descriptor: TypedPropertyDescriptor<(req: Request,
			res: Response) => void> |
		TypedPropertyDescriptor<(req: Request,
			res: Response, next: NextFunction) => void>
	) => {
		if (descriptor.value) {
			AddRequest(descriptor.value, target.constructor,
				METHODS_KEYS.DELETE_METHODS_KEY, 'DELETE', endpoint);
		} else {
			throw new Error('There is no descriptor');
		}
	}
}