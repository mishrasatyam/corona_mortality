import fs from 'fs';
export async function get(req,res){
    const data = JSON.parse(await fs.promises.readFile('world_data.json'))
    res.end(JSON.stringify(data))
}