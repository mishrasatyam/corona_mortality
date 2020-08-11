export function percentage(a,b){
	let val = (a/b)*100;
	return (Number.isNaN(val)) ? 0.00 : val.toFixed(2);
}

export function num_format(num){
	return Number(num).toLocaleString('en-IN')
}