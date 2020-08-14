<script context="module">
	export async function preload(page, session) {
		const res = await this.fetch('india/india_data');
		const data = await res.json();
		return data;
	}  
</script>
<script>
	export let data;
	export let url;
	import Footer from '../../components/Footer.svelte';
	import Heading from '../../components/Heading.svelte';
	import { goto } from '@sapper/app';
	let table_data = data;
	let search_text;
	function search(){
		table_data = data.filter(el => el.state.toLowerCase().startsWith(search_text.toLowerCase()))
	}
</script>  
	<Heading text={"India"}/>
	<h6 style="text-align:center" class="link" on:click={()=>goto('/')}>World</h6>
	<div class="form-group">
		<label for="search">Search by state</label>
		<input type="search" id="search" class="form-control" bind:value={search_text} on:keyup={search}>
	</div>
	<table class="table table-bordered">
		<thead>
		<tr>
			<th rowspan="2">Rank</th>
			<th rowspan="2">State/UT</th>
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
				<td class="link" on:click={()=>goto('/india/'+el.state)}>{el.state}</td>
				{#each ['death','active','recovered'] as param}
				<td>{el[param+'_rate']} ({el[param]})</td>
				{/each}
			</tr>
			{/each}
		</tbody>
	</table>
  <Footer link={url}/>