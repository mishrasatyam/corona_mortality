<script>
	export let data_promise;
	let tab="world"
	let table_data = [];
	let mortality_rate_data = [];
	let search_text;
	let search_state_text;
	let state_table_data=[];
	let india_mortality_rate_data = [];
	async function get_data(){
		let data = await data_promise;
		mortality_rate_data = data.mortality_data;
		india_mortality_rate_data = data.india_mortality_data;
		table_data = mortality_rate_data
		state_table_data = india_mortality_rate_data;
	}
	get_data()
	function search(){
		table_data = mortality_rate_data.filter(el => el.country.toLowerCase().startsWith(search_text.toLowerCase()))
	}
	function search_state(){
		state_table_data = india_mortality_rate_data.filter(el => el.state.toLowerCase().startsWith(search_state_text.toLowerCase()))
	}
</script>
	<div class="container">
	{#if tab=="world"}	
	<h1 style="text-align:center">Mortality data</h1>
	<h6 style="text-align:center" class="link" on:click={()=>tab='india'}>India</h6>
	<div class="form-group">
		<label>Search by country</label>
		<input type="search" class="form-control" bind:value={search_text} on:keyup={search}>
	</div>
	<table class="table table-bordered">
		<thead>
		<tr>
			<th>Rank</th>
			<th>Country</th>
			<th>Rate(%)</th>
		</tr>
	</thead>
		<tbody>
			{#each table_data as el}
			<tr>
				<td>{el.rank}</td>
				{#if el.country=='India'}
				<td class="link" on:click={()=>tab="india"}>{el.country}</td>
				{:else}
				<td>{el.country}</td>
				{/if}
				<td>{el.rate}</td>
			</tr>
			{/each}
		</tbody>
	</table>
	{:else if tab=="india"}
	<h1 style="text-align:center">Mortality data India</h1>
	<h6 style="text-align:center" class="link" on:click={()=>tab='world'}>Go back</h6>
	<div class="form-group">
		<label>Search by state</label>
		<input type="search" class="form-control" bind:value={search_state_text} on:keyup={search_state}>
	</div>
	<table class="table table-bordered">
		<thead>
		<tr>
			<th>Rank</th>
			<th>State/UT</th>
			<th>Rate(%)</th>
		</tr>
	</thead>
		<tbody>
			{#each state_table_data as el}
			<tr>
				<td>{el.rank}</td>
				<td>{el.state}</td>
				<td>{el.rate}</td>
			</tr>
			{/each}
		</tbody>
	</table>
	{/if}
</div>
	<style>

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	.link{
		color: blue;
		cursor: pointer;
	}

</style>