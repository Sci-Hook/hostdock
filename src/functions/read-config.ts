import {readFileSync} from 'fs';

export async function read_config(name:string) {    
    var data = await readFileSync(name);
    var buffer = `${data}`
    global.hosts = JSON.parse(buffer);
}