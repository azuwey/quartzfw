import { ModuleDecorator, AppDecorator } from '../';
import CatsGetController from './controllers/catsget.controller';
import CatsParamController from './controllers/catsparam.controller';
import IndexController from './controllers/index.controller';
import { Application, static as Static} from 'express';

@ModuleDecorator({
	controllers: [
		CatsGetController,
		CatsParamController,
		IndexController
	]
})
export default class ApplicationModule {
	@AppDecorator
	private app?: Application;

	constructor() {
		this.app && this.app.use(Static(__dirname + '/static'));
	}
}