/**
 * @author David Zarandi (Azuwey)
 */
import 'reflect-metadata';
import { SocketEventHandler } from '../misc';
export declare function IncomeDecorator(eventEndPoint: string): (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<SocketEventHandler>) => void;
