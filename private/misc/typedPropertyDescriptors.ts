import { Request, Response, NextFunction } from 'express';

export type Simple
	= TypedPropertyDescriptor<(req: Request, res: Response) => void>

export type Extended
	= TypedPropertyDescriptor<(req: Request, res: Response, next: NextFunction) => void>

export type Param
	= TypedPropertyDescriptor<(req: Request, res: Response, next: NextFunction, param: any) => void>