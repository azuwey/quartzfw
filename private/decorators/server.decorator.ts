import 'reflect-metadata';

import * as Express from 'express';
import { readFileSync } from 'fs';
import * as Http from 'http';
import * as Https from 'https';

import { APPLICATION_KEY, HTTP_KEY, HTTPS_KEY } from '../misc';

const _DEFAULT_PORT: Readonly<number> = 80;
const _DEFAULT_SECURE_PORT: Readonly<number> = 443;

export type ServerDecoratorParam = {
	application: Readonly<Function>,
	/** @default 80 */
	port?: Readonly<number>,
	/** @default 443 */
	securePort?: Readonly<number>
	/** @default false */
	forceToSSL?: Readonly<boolean>,
	domainCsrUrl?: Readonly<string>
	domainKeyUrl?: Readonly<string>,
	domainCrtUrl?: Readonly<string>,
	rejectUnauthorized?: Readonly<boolean>
}

export function ServerDecorator(config: ServerDecoratorParam) {
	let app: Express.Application = Express();
	let port: number = config.port ? config.port : _DEFAULT_PORT;
	let securePort: number = config.securePort ? config.securePort : _DEFAULT_SECURE_PORT;
	let forceToSSL: boolean = config.forceToSSL ? config.forceToSSL : false;
	let rejectUnauthorized: boolean = config.rejectUnauthorized ? config.rejectUnauthorized : true;
	let httpServer: Http.Server = Http.createServer(app).listen(port, () =>
		console.log(`Server is listening in ${port} port`));
	if (config.domainKeyUrl && config.domainCrtUrl) {
		let key: Buffer = readFileSync(config.domainKeyUrl);
		let cert: "" | Buffer | undefined = readFileSync(config.domainCrtUrl);
		let ca: "" | Buffer | undefined = config.domainCsrUrl
			&& readFileSync(config.domainCsrUrl);
		let httpsServer = Https.createServer({
			key, cert, ca, rejectUnauthorized
		}, app).listen(securePort, () =>
			console.log(`Secure server is listening in ${securePort} port`));
		forceToSSL && _forceToSSL(app, port, securePort);
		Reflect.defineMetadata(HTTPS_KEY, httpsServer, config.application);
	} else {
		//Do nothing
	}
	return function classDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
		Reflect.defineMetadata(HTTP_KEY, httpServer, config.application);
		Reflect.defineMetadata(APPLICATION_KEY, app, config.application);
		return class extends constructor {
			public expressApp = app;
		}
	}
}

const _forceToSSL = (app: Express.Application, port: number, securePort: number) => {
	app.use((req, res, next) => {
		let host: string = req.headers.host || '';
		if (!/https/.test(req.protocol) && port !== _DEFAULT_PORT) {
			host = `${host.replace(port.toString(), securePort.toString())}`;
			return res.redirect(`https://${host}${req.url}`);
		} else if (!/https/.test(req.protocol) && securePort !== _DEFAULT_SECURE_PORT) {
			host = `${host}:${securePort}`;
			return res.redirect(`https://${host}${req.url}`);
		} if (!/https/.test(req.protocol)) {
			return res.redirect(`https://${req.headers.host}${req.url}`);
		} else {
			return next();
		}
	});
}