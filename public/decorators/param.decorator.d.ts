/// <reference types="express" />
/**
 * @author David Zarandi (Azuwey)
 */
import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
export declare function ParamDecorator(param?: string): (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<(req: Request, res: Response, next: NextFunction, param: any) => void>) => void;
