"use strict";
/**
 * @author David Zarandi (Azuwey)
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var misc_1 = require("../misc");
var request_decorator_1 = require("./request.decorator");
function PostDecorator(endpoint) {
    if (endpoint === void 0) { endpoint = ''; }
    return function (target, propertyKey, descriptor) {
        if (descriptor.value) {
            request_decorator_1.AddRequest(descriptor.value, target.constructor, misc_1.METHODS_KEYS.POST_METHODS_KEY, 'POST', endpoint);
        }
        else {
            throw new Error('There is no descriptor');
        }
    };
}
exports.PostDecorator = PostDecorator;
//# sourceMappingURL=post.decorator.js.map