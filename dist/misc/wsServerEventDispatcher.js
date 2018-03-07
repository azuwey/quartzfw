"use strict";
/**
 * @author David Zarandi (Azuwey)
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Ws = require("ws");
var WsServerEventDispatcher = /** @class */ (function () {
    function WsServerEventDispatcher(server) {
        this._events = new Map();
        if (WsServerEventDispatcher._instance) {
            throw new Error('Instantiation failed: Use WsServerEventDispatcher.getInstance() instead of new.');
        }
        else {
            WsServerEventDispatcher._instance = this;
            this._wss = new Ws.Server({ server: server });
            this._Dispatch();
        }
    }
    WsServerEventDispatcher.prototype._Dispatch = function () {
        var _this = this;
        this._wss.on('connection', function (socket, request) {
            socket.addListener('message', function (data) {
                try {
                    var event = JSON.parse(data);
                    var eventHandler = _this._events.get(event.eventName);
                    if (eventHandler) {
                        eventHandler(socket, event.eventData);
                    }
                    else {
                        throw new Error('Illegal event received');
                    }
                }
                catch (err) {
                    console.error(err);
                }
            });
            socket.on('close', function (code, reason) {
                socket.removeAllListeners();
            });
        });
    };
    WsServerEventDispatcher.prototype.add = function (eventName, eventCallback) {
        if (!this._events.has(eventName)) {
            this._events.set(eventName, eventCallback);
        }
        else {
            throw new Error('This event name already used in the event handler list');
        }
    };
    WsServerEventDispatcher.getInstance = function (server) {
        if (WsServerEventDispatcher._instance) {
            return WsServerEventDispatcher._instance;
        }
        if (!WsServerEventDispatcher._instance && server) {
            return new WsServerEventDispatcher(server);
        }
        else {
            throw new Error('You have to provide the server parameter.');
        }
    };
    return WsServerEventDispatcher;
}());
exports.WsServerEventDispatcher = WsServerEventDispatcher;
//# sourceMappingURL=wsServerEventDispatcher.js.map