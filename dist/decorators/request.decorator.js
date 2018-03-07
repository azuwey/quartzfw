"use strict";
/**
 * @author David Zarandi (Azuwey)
 */
Object.defineProperty(exports, "__esModule", { value: true });
function AddRequest(callback, target, key, method, endpoint) {
    var events = Reflect.getMetadata(key, target) || [];
    if (events.filter(function (event) { return event.endpoint === endpoint; }).length === 0) {
        events.push({ method: method, endpoint: endpoint, callback: callback });
    }
    else {
        throw new Error('Endpoint is already in the routes');
    }
    Reflect.defineMetadata(key, events, target);
}
exports.AddRequest = AddRequest;
//# sourceMappingURL=request.decorator.js.map