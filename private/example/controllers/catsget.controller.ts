import { NextFunction, Request, Response } from 'express';

import { ControllerDecorator, GetDecorator, ParamDecorator, PostDecorator, PutDecorator, DeleteDecorator } from '../..';

@ControllerDecorator('cats')
export default class CatsGetController {
	@GetDecorator('/:id')
	private getreq(req: Request, res: Response) {
		res.send('hello meow');
	}
}