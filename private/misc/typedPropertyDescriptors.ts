import { NextFunction, Request, Response } from 'express';
import * as Ws from 'ws';

export type Simple
	= TypedPropertyDescriptor<(req: Request, res: Response) => void>

export type Extended
	= TypedPropertyDescriptor<(req: Request, res: Response, next: NextFunction) => void>

export type Param
	= TypedPropertyDescriptor<(req: Request, res: Response, next: NextFunction, param: any) => void>

export type Income
	= TypedPropertyDescriptor<(ws: Ws, message: Ws.Data) => void>