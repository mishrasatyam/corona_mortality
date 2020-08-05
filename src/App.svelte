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

<main>
	<h1>Mortality data</h1>
	<label>Search by country</label>
	<input type="search" bind:value={search_text} on:keyup={search}>
	<table>
		<tr>
			<th>Rank</th>
			<th>Country</th>
			<th>Rate(%)</th>
		</tr>
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
	

</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
	
table {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

table td, table th {
  border: 1px solid #ddd;
  padding: 8px;
}

table tr:nth-child(even){background-color: #f2f2f2;}

table tr:hover {background-color: #ddd;}

table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4CAF50;
  color: white;
}
tr>th{
	background-color: aliceblue;
}
</style>