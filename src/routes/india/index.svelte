<script context="module">
	export async function preload(page, session) {
		const res = await this.fetch('india/india_data');
		const data = await res.json();
		return data
	}  
</script>
<script>
	export let data;
	export let url;
	import Footer from '../../components/Footer.svelte';
	import { goto } from '@sapper/app';
	import { onMount } from 'svelte';
	let table_data = data;
	let search_text;
	function search(){
		table_data = data.filter(el => el.state.toLowerCase().startsWith(search_text.toLowerCase()))
	}

	onMount(()=>{
		const hours = new Date().getHours();
		const isDayTime = hours > 6 && hours < 20;
		if(!isDayTime){
			document.querySelector('body').style.background = 'black';
			document.querySelector('table').style.background = 'black';
			document.querySelector('body').style.color = 'white';
			document.querySelector('table').style.color = 'white';
			document.querySelector('.link').style.color = '#3ac5e4'
		}
	})
</script>  
	<h3 style="text-align:center;text-decoration: underline;">Corona data (India)</h3>
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
  