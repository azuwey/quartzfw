/**
 * @author David Zarandi (Azuwey)
 */
import { SocketEventHandler } from '../misc';
export declare function IncomeDecorator(eventEndPoint: string): (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<SocketEventHandler>) => void;
