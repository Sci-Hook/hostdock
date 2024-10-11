import {readFileSync} from 'fs';

export async function send_html(name:string) {
    var html_buffer = await readFileSync(`html/${name}`)    
    var html_string = `${html_buffer}`
    
}