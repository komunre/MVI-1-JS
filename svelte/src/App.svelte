<script>
	let name = "anon";
	let title = "MVI-1-JS"
	import Editor from './Editor.svelte';
	import About from './About.svelte';

	let showAbout = false;

	function showAboutFunc() {
		showAbout = true;
	}

	function closeAbout() {
		showAbout = false;
	}
</script>

<main>
	<h1>{title}</h1>
	<div class="total">
		<Editor />
	</div>
	<button id="about-show" on:click={showAboutFunc}>Show about</button>
	{#if showAbout == true}
		<button id="about-close" on:click={closeAbout}>Close</button>
		<About show=false />
	{/if}
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

	#about-show {
		position: absolute;
		left: 1000px;
	}

	#about-close {
		position: absolute;
		left: 1000px;
		bottom: 300px;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>