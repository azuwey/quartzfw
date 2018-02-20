import "reflect-metadata";
import * as Express from 'express';

export function ServerDecorator(config: { port: number }) {
	return (
		target: Object, // The prototype of the class
		propertyKey: string | symbol, // The name of the property
	) => {
		let app = Express();
		app.listen(config.port, () => console.log(`Server is listening in ${config.port} port`));
		Object.defineProperty(target, propertyKey, {
			value: app
		});
	}
}

export function Get(path: string) {
	return (
		target: Function,
		key: string,
		descriptor: any
	) => {
		
	}
}