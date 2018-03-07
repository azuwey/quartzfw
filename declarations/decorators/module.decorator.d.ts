export declare type ModuleDecoratorParam = {
    controllers?: Array<Function>;
    gateways?: Array<Function>;
};
export declare function ModuleDecorator(config: ModuleDecoratorParam): (constructor: Function) => void;
