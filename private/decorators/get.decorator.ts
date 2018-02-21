import 'reflect-metadata';
import { GET_METHODS_KEY } from './keys';
import { Request, Response } from 'express';
export function GetDecorator(enpoint: string) {
	return (
		target: Object,
		propertyKey: string,
		descriptor: TypedPropertyDescriptor<(req: Request, res: Response) => void>
	) => {
		let events = <Array<{
			method: string
			enpoint: String,
			callback: Function
		}>>Reflect.getMetadata(GET_METHODS_KEY, target.constructor) || [];
		if (events.filter(event => event.enpoint === enpoint).length === 0) {
			if (descriptor.value) {
				events.push({
					method: 'GET',
					enpoint,
					callback: descriptor.value
				});
			} else {
				throw new Error('There is no descriptor');
			}
		} else {
			throw new Error('Endpoint is already in the routes');
		}
		Reflect.defineMetadata(GET_METHODS_KEY, events, target.constructor);
	}
}