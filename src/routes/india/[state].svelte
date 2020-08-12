<script context="module">
	import {percentage,num_format} from '../utils'
	export async function preload(page, session) {
        const {state} = page.params
		let mortality_data = [];
		const url = 'https://api.covid19india.org/state_district_wise.json';
		const res = await this.fetch(url);
        const data = await res.json();
        const state_data = data[state];
        if(state_data==undefined){
            return this.redirect(302,'/india')
        }
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
        return {data:mortality_data,url,state}
	}  
  </script>
  <script>
	export let data;
    export let url;
    export let state;
	import Footer from '../../components/Footer.svelte';
	import Heading from '../../components/Heading.svelte';
	import { goto } from '@sapper/app';
	let table_data = data;
	let search_text;
	function search(){
		table_data = data.filter(el => el.district.toLowerCase().startsWith(search_text.toLowerCase()))
	}
</script>
	<Heading text={state}/>
	<h6 style="text-align:center" class="link"><span on:click={()=>goto('/')}>World</span> <span on:click={()=>goto('/india')}>India</span></h6>
	<div class="form-group">
		<label for="search">Search by district</label>
		<input type="search" id="search" class="form-control" bind:value={search_text} on:keyup={search}>
	</div>
	<table class="table table-bordered">
		<thead>
		<tr>
			<th rowspan="2">Rank</th>
			<th rowspan="2">District</th>
			<th colspan="3" style="text-align: center;">Rate(%)</th>
		</tr>
		<tr>
			<th>Deaths</th>
			<th>Active</th>
			<th>Recovered</th>
		</tr>
	</thead>
		<tbody>
			{#each table_data as el}
			<tr>
				<td>{el.rank}</td>
				<td>{el.district}</td>
				{#each ['death','active','recovered'] as param}
				<td>{el[param+'_rate']} ({el[param]})</td>
				{/each}
			</tr>
			{/each}
		</tbody>
	</table>
  <Footer link={url}/>