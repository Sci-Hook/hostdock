import {ServerResponse} from 'http';
import {readFileSync} from 'fs';

export async function send_html(name:string,res:ServerResponse,status:number) {
    var html_buffer = await readFileSync(`html/${name}.html`)    
    var html_string = `${html_buffer}`;
    res.statusCode = status;
    res.setHeader('Content-Type','text/html')
    res.write(html_string)
    res.end();
}