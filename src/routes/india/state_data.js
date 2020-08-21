import fs from 'fs';
export async function post(req,res){
    const {state} = req.body;
    const {data,url} = JSON.parse(await fs.promises.readFile('state_data.json'));
    const state_data = data[state];
    let json_response=(state_data==undefined)?{status:400}:{status:200,data:state_data,state,url};
    res.end(JSON.stringify(json_response));
}