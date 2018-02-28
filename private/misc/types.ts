import { NextFunction, Request, Response } from 'express';
import * as Ws from 'ws';

export type Simple
	= TypedPropertyDescriptor<(req: Request, res: Response) => void>;

export type Extended
	= TypedPropertyDescriptor<(req: Request, res: Response, next: NextFunction) => void>;

export type Param
	= TypedPropertyDescriptor<(req: Request, res: Response, next: NextFunction, param: any) => void>;

export type SocketEventHandler = (ws: Ws, ...args: any[]) => void;

export type Income
	= TypedPropertyDescriptor<SocketEventHandler>;

export type IncomingEvent = { eventName: string, eventData: any };