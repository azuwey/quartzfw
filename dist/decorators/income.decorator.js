"use strict";
/**
 * @author David Zarandi (Azuwey)
 */
Object.defineProperty(exports, "__esModule", { value: true });
var misc_1 = require("../misc");
function IncomeDecorator(eventEndPoint) {
    return function (target, propertyKey, descriptor) {
        if (descriptor.value) {
            var events = Reflect.getMetadata(misc_1.INCOME_SOCKET_KEY, target.constructor) || [];
            if (events.filter(function (event) { return event.endpoint === eventEndPoint; }).length === 0) {
                var callback = descriptor.value;
                events.push({
                    endpoint: eventEndPoint,
                    callback: callback
                });
            }
            else {
                throw new Error('Endpoint is already in the routes');
            }
            Reflect.defineMetadata(misc_1.INCOME_SOCKET_KEY, events, target.constructor);
        }
        else {
            throw new Error('There is no descriptor');
        }
    };
}
exports.IncomeDecorator = IncomeDecorator;
//# sourceMappingURL=income.decorator.js.map