import fetch from 'node-fetch'
import {writeFile} from 'fs'
const url = 'https://disease.sh/v3/covid-19/countries';

async function save_img(url,file_path){
    const res = await fetch(url);
    const data =await res.buffer();
    await writeFile(file_path,data,(err)=>{if(err){console.log(err)}})
}
async function main(){
    const res = await fetch(url);
    const data = await res.json();
    data.forEach(async el => {
        let country = el.country;
        let flag_url = el.countryInfo.flag;
        let flag_save_path = `static/flags/${country}.png`
        save_img(flag_url,flag_save_path)
    })
}
main()