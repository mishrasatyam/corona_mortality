<script context="module">
	import {percentage,num_format} from './utils'
	export async function preload(page, session) {
		let mortality_data = [];
		const url = 'https://disease.sh/v3/covid-19/countries';
		const res = await this.fetch(url);
		const data = await res.json();
		let i = data.length;
		data.forEach(el => mortality_data.push({country:el.country,death_rate:percentage(el.deaths,el.cases),death:num_format(el.deaths)
			,active_rate:percentage(el.active,el.cases),active:num_format(el.active)
			,recovered_rate:percentage(el.recovered,el.cases),recovered:num_format(el.recovered)
		}))
		mortality_data.sort((a,b)=>{return b.death_rate-a.death_rate})
		mortality_data.forEach(el => { el.rank=i;i-=1; })
		return {data:mortality_data,url}
	}  
  </script>
<script>
	export let data;
	export let url;
	import Footer from '../components/Footer.svelte';
	import Heading from '../components/Heading.svelte';
	import { goto } from '@sapper/app';
	let table_data = data;
	let search_text;
	function search(){
		table_data = data.filter(el => el.country.toLowerCase().startsWith(search_text.toLowerCase()))
	}
</script>  
  <Heading text={"World"}/>  
  <h6 style="text-align:center" class="link" on:click={()=>goto('/india')}>India</h6>
  <div class="form-group">
	  <label for="search">Search by country</label>
	  <input id="search" type="search" class="form-control" bind:value={search_text} on:keyup={search}>
  </div>
  <table class="table table-bordered">
	  <thead>
	  <tr>
		  <th rowspan="2">Rank</th>
		  <th rowspan="2">Country</th>
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
			  {#if el.country=='India'}
			  <td class="link" on:click={()=>goto('/india')}>{el.country}</td>
			  {:else}
			  <td>{el.country}</td>
			  {/if}
			  {#each ['death','active','recovered'] as param}
			  <td>{el[param+'_rate']} ({el[param]})</td>
			  {/each}
		  </tr>
		  {/each}
	  </tbody>
  </table>
  <Footer link={url}/>