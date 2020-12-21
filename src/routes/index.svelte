<script context="module">
	export async function preload(page, session) {
		const res = await this.fetch('world_data');
		const data = await res.json();
		return data;
	}  
</script>
<script>
	// import {data} from '../../'
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
			  <td class="link" on:click={()=>goto('/india')}>
				  {el.country}
				  <img src='/flags/{el.country}.png' alt='{el.country}' style="height:10%;margin-bottom: -1.5%;">
				</td>
			  {:else}
			  <td>{el.country} <img src='/flags/{el.country}.png' alt='{el.country}' style="height:10%;margin-bottom: -1.5%;"></td>
			  {/if}
			  {#each ['death','active','recovered'] as param}
			  <td>{el[param+'_rate']} ({el[param]})</td>
			  {/each}
		  </tr>
		  {/each}
	  </tbody>
  </table>
  <Footer link={url}/>