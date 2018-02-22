import { NextFunction, Request, Response } from 'express';

import { ControllerDecorator, GetDecorator, ParamDecorator, PostDecorator, PutDecorator, DeleteDecorator } from '../..';

@ControllerDecorator('cats')
export default class CatsParamController {
	@ParamDecorator('id')
	private paramreq(req: Request, res: Response, next: NextFunction, id: any) {
		console.log(id);
		next();
	}
}