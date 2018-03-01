/// <reference types="express" />
/**
 * @author David Zarandi (Azuwey)
 */
import 'reflect-metadata';
import * as Express from 'express';
export declare type ServerDecoratorParam = {
    application: Readonly<Function>;
    /** @default 80 */
    port?: Readonly<number>;
    /** @default 443 */
    securePort?: Readonly<number>;
    /** @default false */
    forceToSSL?: Readonly<boolean>;
    domainCsrUrl?: Readonly<string>;
    domainKeyUrl?: Readonly<string>;
    domainCrtUrl?: Readonly<string>;
    rejectUnauthorized?: Readonly<boolean>;
};
export declare function ServerDecorator(config: ServerDecoratorParam): <T extends new (...args: any[]) => {}>(constructor: T) => {
    new (...args: any[]): {
        expressApp: Express.Application;
    };
} & T;
