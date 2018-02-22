import 'reflect-metadata';

import * as Express from 'express';
import { readFileSync } from 'fs';
import * as Http from 'http';
import * as Https from 'https';
import * as SocketIO from 'socket.io';

import { APPLICATION_KEY, HTTPS_KEY, HTTP_KEY } from '../misc/keys';

const DEFAULT_PORT: number = 80;
const DEFAULT_SECURE_PORT: number = 443;
const FORCE_TO_SSL: boolean = false;

type ServerDecoratorParam = {
	application: Function,
	/** @default 80 */
	port?: number,
	/** @default 443 */
	securePort?: number
	/** @default false */
	forceToSSL?: boolean,
	domainKeyUrl?: string,
	domainCrtUrl?: string
}

export function ServerDecorator(config: ServerDecoratorParam) {
	let app = Express();
	let port = config.port ? config.port : DEFAULT_PORT;
	let securePort = config.securePort ? config.securePort : DEFAULT_SECURE_PORT;
	let forceToSSL = config.forceToSSL;
	let httpServer: Http.Server;
	if (config.domainKeyUrl && config.domainCrtUrl) {
		let key = readFileSync(config.domainKeyUrl);
		let cert = readFileSync(config.domainCrtUrl);
		httpServer = Http.createServer(app).listen(port, () =>
			console.log(`Server is listening in ${port} port`));
		let httpsServer = Https.createServer({ key, cert, rejectUnauthorized: false }, app).listen(securePort, () =>
			console.log(`Secure server is listening in ${securePort} port`));
		Reflect.defineMetadata(HTTPS_KEY, httpsServer, config.application);
		forceToSSL && app.use((req, res, next) => {
			let host: string = req.headers.host || '';
			if (!/https/.test(req.protocol) && port !== DEFAULT_PORT) {
				host = `${host.replace(port.toString(), securePort.toString())}`;
				return res.redirect(`https://${host}${req.url}`);
			} else if (!/https/.test(req.protocol) && securePort !== DEFAULT_SECURE_PORT) {
				host = `${host}:${securePort}`;
				return res.redirect(`https://${host}${req.url}`);
			} if (!/https/.test(req.protocol)) {
				return res.redirect(`https://${req.headers.host}${req.url}`);
			} else {
				return next();
			}
		});
	} else {
		httpServer = Http.createServer(app).listen(config.port, () =>
			console.log(`Server is listening in ${config.port} port`));
	}
	return function classDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
		Reflect.defineMetadata(HTTP_KEY, httpServer, config.application);
		Reflect.defineMetadata(APPLICATION_KEY, app, config.application);
		return class extends constructor {
			expressApp = app;
		}
	}
}