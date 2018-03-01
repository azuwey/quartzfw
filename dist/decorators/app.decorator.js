"use strict";
/**
 * @author David Zarandi (Azuwey)
 */
Object.defineProperty(exports, "__esModule", { value: true });
var misc_1 = require("../misc");
function AppDecorator(target, propertyKey) {
    var timer = setInterval(function () {
        var expressApp = Reflect
            .getMetadata(misc_1.APPLICATION_KEY, target.constructor);
        (expressApp) && (function () {
            clearInterval(timer);
            Object.defineProperty(target, propertyKey, {
                value: expressApp
            });
        })();
    }, 0);
}
exports.AppDecorator = AppDecorator;
//# sourceMappingURL=app.decorator.js.map