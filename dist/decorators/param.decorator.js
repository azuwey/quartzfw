"use strict";
/**
 * @author David Zarandi (Azuwey)
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var misc_1 = require("../misc");
var request_decorator_1 = require("./request.decorator");
function ParamDecorator(param) {
    if (param === void 0) { param = ''; }
    return function (target, propertyKey, descriptor) {
        if (descriptor.value) {
            request_decorator_1.AddRequest(descriptor.value, target.constructor, misc_1.METHODS_KEYS.PARAM_METHODS_KEY, 'PARAM', param);
        }
        else {
            throw new Error('There is no descriptor');
        }
    };
}
exports.ParamDecorator = ParamDecorator;
//# sourceMappingURL=param.decorator.js.map