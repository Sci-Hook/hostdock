"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
require("syncforeachloop");
var Request = /** @class */ (function () {
    function Request(ip, port) {
        this.body = [];
        this.headers = {};
        this.transfered_data = [];
        this.ip = ip;
        this.port = port;
    }
    Request.prototype.appendHeader = function (data) {
        var header = data.split(':');
        this.headers[header[0]] = header[1];
    };
    Request.prototype.appendBody = function (data) {
        this.body.push(data);
    };
    return Request;
}());
exports.Request = Request;
