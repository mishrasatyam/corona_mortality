import fs from "fs";
import fetch from "node-fetch";

export function percentage(a,b){
	let val = (a/b)*100;
	return (Number.isNaN(val)) ? 0.00 : val.toFixed(2);
}

export function num_format(num){
	return Number(num).toLocaleString('en-IN')
}
export function diff_hours(dt2, dt1) {

 var diff =(dt2.getTime() - dt1.getTime()) / 1000;
 diff /= (60 * 60);
 return diff;
 
}

async function world_data(){
	let mortality_data = [];
	const url = 'https://disease.sh/v3/covid-19/countries';
	const res = await fetch(url);
	const data = await res.json();
	let i = data.length;
	data.forEach(el => mortality_data.push({country:el.country,death_rate:percentage(el.deaths,el.cases),death:num_format(el.deaths)
		,active_rate:percentage(el.active,el.cases),active:num_format(el.active)
		,recovered_rate:percentage(el.recovered,el.cases),recovered:num_format(el.recovered)
	}))
	mortality_data.sort((a,b)=>{return b.death_rate-a.death_rate})
	mortality_data.forEach(el => { el.rank=i;i-=1; })
	await fs.promises.writeFile('world_data.json',JSON.stringify({data:mortality_data,url},null,4))
	// return {data:mortality_data,url}
	
}

async function india_data(){
	let mortality_data = [];
	const url = 'https://api.covid19india.org/data.json';
	const res = await fetch(url);
	let data = (await res.json()).statewise;
	data = data.filter(el => !(el.statecode=='UN' || el.statecode=='TT'))
	data = data.filter(el => !(el.statecode=='UN' || el.statecode=='TT'))
	let i = data.length
	data.forEach(el => mortality_data.push({state:el.state,death_rate:percentage(el.deaths,el.confirmed),death:num_format(el.deaths)
		,active_rate:percentage(el.active,el.confirmed),active:num_format(el.active)
		,recovered_rate:percentage(el.recovered,el.confirmed),recovered:num_format(el.recovered)
	}))
	mortality_data.sort((a,b) => {return b.death_rate-a.death_rate})
	mortality_data.forEach(el =>{el.rank=i;i-=1})
	// return {data:mortality_data,url}
	await fs.promises.writeFile('india_data.json',JSON.stringify({data:mortality_data,url},null,4))
	
}
async function state_data(){
	let final_state_data = {};
	const url = 'https://api.covid19india.org/state_district_wise.json';
	const res = await fetch(url);
	const data = await res.json();
	let state_list = Object.keys(data)
	state_list.forEach(state =>{
		if(state!='State Unassigned'){
			let state_data = data[state];
			let mortality_data = [];
			const district_data = state_data.districtData;
			Object.entries(district_data).forEach(el => {
				let district = el[0];
				let value = el[1];
				if(district !='Unknown' && district !='Other State'){
					mortality_data.push({district,death_rate:percentage(value.deceased,value.confirmed),death:num_format(value.deceased)
					,active_rate:percentage(value.active,value.confirmed),active:num_format(value.active)
					,recovered_rate:percentage(value.recovered,value.confirmed),recovered:num_format(value.recovered)
					})
				}
			})
			let i = mortality_data.length;
			mortality_data.sort((a,b)=>{return b.death_rate-a.death_rate})
			mortality_data.forEach(el => { el.rank=i;i-=1; })
			final_state_data[state] = mortality_data
		}	
	})
	await fs.promises.writeFile('state_data.json',JSON.stringify({data:final_state_data,url},null,4))
	// return {data:state_data,url}	
	
}



export async function generate_data(){
    await Promise.all([world_data(),india_data(),state_data()]) 
}


export async function update(now_date){
    await generate_data();
    await fs.promises.writeFile('date.json',JSON.stringify({date:now_date},null,4))
}

