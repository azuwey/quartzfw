import { ModuleDecorator } from '../';
import CatsController from './controllers/cats.controller';
import IndexController from './controllers/index.controller';

@ModuleDecorator({
	controllers: [
		CatsController,
		IndexController
	]
})
export default class Application {}