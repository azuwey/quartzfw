"use strict";
/**
 * @author David Zarandi (Azuwey)
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var Express = require("express");
var fs_1 = require("fs");
var Http = require("http");
var Https = require("https");
var misc_1 = require("../misc");
var _DEFAULT_PORT = 80;
var _DEFAULT_SECURE_PORT = 443;
function ServerDecorator(config) {
    var app = Express();
    var port = config.port ? config.port : _DEFAULT_PORT;
    var securePort = config.securePort ? config.securePort : _DEFAULT_SECURE_PORT;
    var forceToSSL = config.forceToSSL ? config.forceToSSL : false;
    var rejectUnauthorized = config.rejectUnauthorized ? config.rejectUnauthorized : true;
    var httpServer = Http.createServer(app).listen(port, function () {
        return console.log("Server is listening in " + port + " port");
    });
    if (config.domainKeyUrl && config.domainCrtUrl) {
        var key = fs_1.readFileSync(config.domainKeyUrl);
        var cert = fs_1.readFileSync(config.domainCrtUrl);
        var ca = config.domainCsrUrl
            && fs_1.readFileSync(config.domainCsrUrl);
        var httpsServer = Https.createServer({
            key: key, cert: cert, ca: ca, rejectUnauthorized: rejectUnauthorized
        }, app).listen(securePort, function () {
            return console.log("Secure server is listening in " + securePort + " port");
        });
        forceToSSL && _forceToSSL(app, port, securePort);
        Reflect.defineMetadata(misc_1.HTTPS_KEY, httpsServer, config.application);
    }
    else {
        //Do nothing
    }
    return function classDecorator(constructor) {
        Reflect.defineMetadata(misc_1.HTTP_KEY, httpServer, config.application);
        Reflect.defineMetadata(misc_1.APPLICATION_KEY, app, config.application);
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.expressApp = app;
                return _this;
            }
            return class_1;
        }(constructor));
    };
}
exports.ServerDecorator = ServerDecorator;
var _forceToSSL = function (app, port, securePort) {
    app.use(function (req, res, next) {
        var host = req.headers.host || '';
        if (!/https/.test(req.protocol) && port !== _DEFAULT_PORT) {
            host = "" + host.replace(port.toString(), securePort.toString());
            return res.redirect("https://" + host + req.url);
        }
        else if (!/https/.test(req.protocol) && securePort !== _DEFAULT_SECURE_PORT) {
            host = host + ":" + securePort;
            return res.redirect("https://" + host + req.url);
        }
        if (!/https/.test(req.protocol)) {
            return res.redirect("https://" + req.headers.host + req.url);
        }
        else {
            return next();
        }
    });
};
//# sourceMappingURL=server.decorator.js.map