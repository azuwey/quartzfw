/**
 * @author David Zarandi (Azuwey)
 */

export function AddRequest(
	callback: Function,
	target: Function,
	key: string,
	method: string,
	endpoint: string
) {
	let events = <Array<{
		method: string
		endpoint: string,
		callback: Function
	}>>Reflect.getMetadata(key, target) || [];
	if (events.filter(event => event.endpoint === endpoint).length === 0) {
		events.push({ method, endpoint, callback });
	} else {
		throw new Error('Endpoint is already in the routes');
	}
	Reflect.defineMetadata(key, events, target);
}