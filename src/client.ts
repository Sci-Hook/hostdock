import * as http from 'http';
import { getHeaders } from './functions/get-headers';
import { client_optins } from './types/client-options';

export async function send_request(options:client_optins) {

    return new Promise<{headers:any,body:any}>(async (resolve, reject) => {

        const req = http.request(options, (res) => {
            let data:Buffer[] = [];
        
            res.on('data', (chunk) => {
                data.push(chunk);
            });
        
            res.on('end', async () => {
                var headers = await getHeaders(res.rawHeaders);
                resolve({headers,body:data});
            });
            
        });
    
        if (options.datas) {
            await options.datas.syncForEach(function (data,next) {
                req.write(data);
                next();
            })
        }
     
        req.end();
        
    })
    
}