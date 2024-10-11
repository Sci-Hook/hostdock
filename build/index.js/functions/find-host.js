"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.find_host = find_host;
function find_host(host) {
    var hosts = global.hosts;
    return new Promise(function (resolve, reject) {
        hosts.syncForEach(function (host_data, next) {
            if (host_data['header-hostname'] == host) {
                return resolve({
                    host: host_data.ip,
                    port: host_data.port
                });
            }
            next();
        }, function () {
            reject();
        });
    });
}
