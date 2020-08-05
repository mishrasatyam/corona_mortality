import App from './App.svelte';
import fetch from 'node-fetch';
function percentage(a,b){
	let val = (a/b)*100;
	return (Number.isNaN(val)) ? 0.00 : val.toFixed(2);
}
async function get_data(){
	let mortality_data = [];
	let res = await fetch('https://disease.sh/v3/covid-19/countries')
	let data = await res.json();
	let i = data.length;
	data.forEach(el => mortality_data.push({country:el.country,rate:percentage(el.deaths,el.cases)}))
	mortality_data.sort((a,b)=>{return b.rate-a.rate})
	mortality_data.forEach(el => { el.rank=i;i-=1; })
	let india_mortality_data = []
	let res2 = await fetch('https://api.covid19india.org/data.json')
	let data2 = (await res2.json()).statewise;
	data2 = data2.filter(el => !(el.statecode=='UN' || el.statecode=='TT'))
	let j = data2.length
	
	data2.forEach(el => india_mortality_data.push({state:el.state,rate:percentage(el.deaths,el.confirmed)}))
	
	india_mortality_data.sort((a,b) => {return b.rate-a.rate})
	india_mortality_data.forEach(el =>{el.rank=j;j-=1})
	console.log(india_mortality_data)
	return {mortality_data,india_mortality_data}
}
const app = new App({
	target: document.body,
	props: {
		data_promise:get_data()
	}
});

export default app;