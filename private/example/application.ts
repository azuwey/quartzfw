import CatsController from './controllers/cats.controller';
import { ModuleDecorator } from '../';

@ModuleDecorator({
	controllers: [
		CatsController
	]
})
export default class Application {}