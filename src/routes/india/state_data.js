import fs from 'fs';
export async function get(req,res){
    const data = JSON.parse(await fs.promises.readFile('state_data.json'));
    res.end(JSON.stringify(data))
}