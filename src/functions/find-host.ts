export function find_host(host:string) {
    var hosts = global.hosts;

    return new Promise<{host:string,port:number}>((resolve, reject) => {

        hosts.syncForEach(function (host_data,next) {
            
            if (host_data['header-hostname'] == host) {
                return resolve({
                    host:host_data.ip,
                    port:host_data.port
                })
            }

            next();
        },() => {
            reject();
        });
        
    })
}