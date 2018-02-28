import { APPLICATION_KEY } from '../misc';

export function AppDecorator(
	target: Object,
	propertyKey: string | symbol
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