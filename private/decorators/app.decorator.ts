import { APPLICATION_KEY } from "./keys";

export function AppDecorator(
	target: Object, // The prototype of the class
	propertyKey: string | symbol // The name of the property
) {
	let timer = setInterval(() => {
		let expressApp = <Express.Application>Reflect
			.getMetadata(APPLICATION_KEY, target.constructor);
		(expressApp) && (() => {
			clearInterval(timer);
			Object.defineProperty(target, propertyKey, {
				value: expressApp
			});
		})();
	}, 0);
}