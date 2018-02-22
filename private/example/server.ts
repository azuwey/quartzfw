import * as Path from 'path';
import Application from './application.module';

import { ServerDecorator, AppDecorator } from '..';

const domainKeyUrl = Path.resolve(__dirname, 'domain.key');
const domainCrtUrl = Path.resolve(__dirname, 'domain.cert');

@ServerDecorator({
	application: Application,
	domainKeyUrl,
	domainCrtUrl,
	forceToSSL: false
})
export default class Server {}