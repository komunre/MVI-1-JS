<script>
	let name = "anon";
	let title = "MVI-1-JS"
	import Editor from './Editor.svelte';
	import About from './About.svelte';
	import Login from './Login.svelte';

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
	<div id="login">
		<Login />
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

	#about-show {
		position: absolute;
		right: 20px;
	}

	#about-close {
		position: absolute;
		right: 20px;
		bottom: 300px;
	}

	#login {
		position: absolute;
		right: 5px;
		top: 400px;
		width: 250px;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>