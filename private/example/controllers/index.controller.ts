import { Request, Response } from 'express';

import { ControllerDecorator, GetDecorator } from '../..';

@ControllerDecorator()
export default class IndexController {
	@GetDecorator()
	private test(req: Request, res: Response) {
		res.send('hello world');
		console.log(this);
	}
}