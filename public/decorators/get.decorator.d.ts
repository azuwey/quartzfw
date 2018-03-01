/// <reference types="express" />
/**
 * @author David Zarandi (Azuwey)
 */
import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
export declare function GetDecorator(endpoint?: string): (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<(req: Request, res: Response) => void> | TypedPropertyDescriptor<(req: Request, res: Response, next: NextFunction) => void>) => void;
