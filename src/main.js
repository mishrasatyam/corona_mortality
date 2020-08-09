import App from './App.svelte';
import fetch from 'node-fetch';
function percentage(a,b){
	let val = (a/b)*100;
	return (Number.isNaN(val)) ? 0.00 : val.toFixed(2);
}
function num_format(num){
	return Number(num).toLocaleString('en-IN')
}
async function get_data(){
	let mortality_data = [];
	let url_list = ['https://disease.sh/v3/covid-19/countries','https://api.covid19india.org/data.json'];
	let requests = url_list.map(url => fetch(url));
	let [res1,res2] =await Promise.all(requests)
	let data = await res1.json();
	let data2 = (await res2.json()).statewise;
	let i = data.length;
	data.forEach(el => mortality_data.push({country:el.country,death_rate:percentage(el.deaths,el.cases),death:num_format(el.deaths)
		,active_rate:percentage(el.active,el.cases),active:num_format(el.active)
		,recovered_rate:percentage(el.recovered,el.cases),recovered:num_format(el.recovered)
	}))
	mortality_data.sort((a,b)=>{return b.death_rate-a.death_rate})
	mortality_data.forEach(el => { el.rank=i;i-=1; })
	let india_mortality_data = []
	data2 = data2.filter(el => !(el.statecode=='UN' || el.statecode=='TT'))
	let j = data2.length
	data2.forEach(el => india_mortality_data.push({state:el.state,death_rate:percentage(el.deaths,el.confirmed),death:num_format(el.deaths)
		,active_rate:percentage(el.active,el.confirmed),active:num_format(el.active)
		,recovered_rate:percentage(el.recovered,el.confirmed),recovered:num_format(el.recovered)
	}))
	india_mortality_data.sort((a,b) => {return b.death_rate-a.death_rate})
	india_mortality_data.forEach(el =>{el.rank=j;j-=1})
	return {mortality_data,india_mortality_data,sources:url_list}
}
const app = new App({
	target: document.body,
	props: {
		data_promise:get_data()
	}
});

export default app;