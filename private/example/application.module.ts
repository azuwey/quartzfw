import { ModuleDecorator, AppDecorator } from '../';
import CatsController from './controllers/cats.controller';
import IndexController from './controllers/index.controller';
import { Application, static as Static} from 'express';

@ModuleDecorator({
	controllers: [
		CatsController,
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