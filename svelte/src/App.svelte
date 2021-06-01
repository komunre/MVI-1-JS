<script>
	let name = "anon";
	let title = "CSIM-JS"
	import Editor from './Editor.svelte';
</script>

<main>
	<h1>{title}</h1>
	<div class="total">
		<Editor />
	</div>
</main>

<style>
	main {
		text-align: left;
		padding: 1em;
		max-width: 240px;
		background-color: #11677c;
		color: #22caf4;
		position: fixed;
		bottom: 0px;
		right: 0px;
		top: 0px;
		left: 0px;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>