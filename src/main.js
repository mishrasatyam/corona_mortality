import App from './App.svelte';
import fetch from 'node-fetch';
async function get_data(){
	let mortality_data = [];
	let res = await fetch('https://disease.sh/v3/covid-19/countries')
	let data = await res.json();
	let total = data.length;
	data.forEach(el => mortality_data.push({country:el.country,rate:(el.deaths/el.cases)*100}))
	mortality_data.sort((a,b)=>{return b.rate-a.rate})
	let i = total;
	mortality_data.forEach(el => { el.rank=i;i-=1; })
	return mortality_data
}
const app = new App({
	target: document.body,
	props: {
		data_promise:get_data()
	}
});

export default app;