export function getHeaders(rawHeaders:string[]) {
    
    return new Promise<any>(async (resolve, reject) => {
        var headers = {};

        await rawHeaders.syncForEach(function (header,next,i) {
            if (i % 2 == 0) {
                return next()
            };
            headers[header] = rawHeaders[rawHeaders.indexOf(header) + 1]
            next();
        });
        
        resolve(headers);

    })
 
}