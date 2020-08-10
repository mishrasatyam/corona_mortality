import fs from "fs";
import { diff_hours,update } from "../utils";

export async function get(req,res){    
    const now_date = new Date();
    let data;
    try{
        let date = JSON.parse(await fs.promises.readFile('date.json'))
        if(diff_hours(now_date,new Date(date.date))>6){
            await update(now_date);
        }
    }catch(err){
        await update(now_date);
    }
    try{
        data = JSON.parse(await fs.promises.readFile('state_data.json'));
    }catch(err){
        await update(now_date);
        data = JSON.parse(await fs.promises.readFile('state_data.json'));
    }
    res.end(JSON.stringify(data))
}