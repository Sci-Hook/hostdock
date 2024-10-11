import 'syncforeachloop';
import * as http from 'http';
import { send_request } from './client';
import { getHeaders } from './functions/get-headers';
import { read_config } from './functions/read-config';
import { find_host } from './functions/find-host';
import { send_html } from './functions/get-html';

read_config('hosts.json')

http.createServer(function (req,res) {

    var datas:Buffer[] = [];

    req.on('data',(data) => {
        datas.push(data);
    });

    req.on('end', async () => {
        
        if (!req.headers.host) {
            console.log(1);
            send_html('errors/bad-request.html')
            return res.end(); 
        }

        if (req.method && req.url) {
            
            var headers = await getHeaders(req.rawHeaders);  
            
            try {
                var host_datas = await find_host(req.headers.host);
            } catch (error) {
                
                return;
            }       

            var result = await send_request({
                method:req.method,
                headers,
                hostname:host_datas.host,
                path:req.url,
                port:host_datas.port,
                datas
            });
    
            var header_keys = Object.keys(result.headers);
    
            await header_keys.syncForEach(function (header_key,next) {
                res.setHeader(header_key,result.headers[header_key]);
                next();
            })
    
            await result.body.syncForEach(function (data:Buffer,next) {
                res.write(data);
                next();
            })
            
        }

        res.end();
    });


}).listen(6060);

