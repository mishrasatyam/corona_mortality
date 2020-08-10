<script context="module">
	export async function preload(page, session) {
        const {state} = page.params;
        const res = await this.fetch('india/state_data');
        let {data,url} = await res.json();
        if(data[state]==undefined){
            return this.redirect(302,'/india')
        }
		return {data:data[state],url,state}
	}  
</script>
  <script>
	export let data;
    export let url;
    export let state;
	import Footer from '../../components/Footer.svelte';
	import { goto } from '@sapper/app';
	import { onMount } from 'svelte';
	let table_data = data;
	let search_text;
	function search(){
		table_data = data.filter(el => el.district.toLowerCase().startsWith(search_text.toLowerCase()))
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
	<h3 style="text-align:center;text-decoration: underline;">Corona data ({state})</h3>
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
  