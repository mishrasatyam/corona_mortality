const fs = require('fs');
const fetch = require('node-fetch');

function percentage(a,b){
	let val = (a/b)*100;
	return (Number.isNaN(val)) ? 0.00 : val.toFixed(2);
}

function num_format(num){
	return Number(num).toLocaleString('en-IN')
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
	await fs.promises.writeFile('json_data/world_data.json',JSON.stringify({data:mortality_data,url},null,4))
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
	await fs.promises.writeFile('json_data/india_data.json',JSON.stringify({data:mortality_data,url},null,4))

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
	await fs.promises.writeFile('json_data/state_data.json',JSON.stringify({data:final_state_data,url},null,4))
}

async function update(){
    await Promise.all([world_data(),india_data(),state_data()])
}

update()
