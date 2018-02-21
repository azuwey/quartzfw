import 'reflect-metadata';

import * as Express from 'express';
import { readFileSync } from 'fs';
import * as Http from 'http';
import * as Https from 'https';
import { APPLICATION_KEY } from './keys';
const DEFAULT_PORT: number = 80;

type ModuleDecoratorParam = {
	controllers: Array<Function>
}

export function ModuleDecorator(config: ModuleDecoratorParam) {
	return (constructor: Function) => {
		setTimeout(() => {
			let metaData = Reflect.getMetadata(APPLICATION_KEY, constructor);
			config.controllers.forEach(target => {
				Reflect.defineMetadata(APPLICATION_KEY, metaData, target);
			});
			new (<any>constructor);
		}, 0)
	}
}