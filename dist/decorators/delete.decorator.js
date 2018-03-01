"use strict";
/**
 * @author David Zarandi (Azuwey)
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var misc_1 = require("../misc");
var request_decorator_1 = require("./request.decorator");
function DeleteDecorator(endpoint) {
    if (endpoint === void 0) { endpoint = ''; }
    return function (target, propertyKey, descriptor) {
        if (descriptor.value) {
            request_decorator_1.AddRequest(descriptor.value, target.constructor, misc_1.METHODS_KEYS.DELETE_METHODS_KEY, 'DELETE', endpoint);
        }
        else {
            throw new Error('There is no descriptor');
        }
    };
}
exports.DeleteDecorator = DeleteDecorator;
//# sourceMappingURL=delete.decorator.js.map