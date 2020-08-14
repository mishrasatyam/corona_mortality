import fs from 'fs';
export async function post(req,res){
    const {state} = req.body;
    const {data,url} = JSON.parse(await fs.promises.readFile('state_data.json'));
    const state_data = data[state];
    if(state_data==undefined){
        res.end({"status":400})
    }
    else{
        res.end(JSON.stringify({status:200,data:state_data,state,url}))
    }
}