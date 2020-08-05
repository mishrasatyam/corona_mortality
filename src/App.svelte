<script>
	export let data_promise;
	let table_data = [];
	let mortality_rate_data = [];
	let search_text;
	async function get_data(){
		mortality_rate_data = await data_promise;
		table_data = mortality_rate_data
	}
	get_data()
	function search(){
		console.log(search_text)
		table_data = mortality_rate_data.filter(el => el.country.toLowerCase().startsWith(search_text.toLowerCase()))
	}
</script>
	<div class="container">
	<h1 style="text-align:center">Mortality data</h1>
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
				<td>{el.country}</td>
				<td>{el.rate}</td>
			</tr>
			{/each}
		</tbody>
	</table>
</div>
	<style>

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}


</style>