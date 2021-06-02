<script>
	let user = '';
	let pass = '';
	let req = new XMLHttpRequest();

	function auth() {
		req.open("POST", "/api");
		req.setRequestHeader('Content-Type', 'application/json');
		req.send(JSON.stringify({type: "login", user: user, pass: pass}));
	}

	function register() {
		req.open("POST", "/api");
		req.setRequestHeader('Content-Type', 'application/json');
		req.send(JSON.stringify({type: "register", user: user, pass: pass}));
	}
</script>

<input type="text" bind:value={user}>
<input type="password" bind:value={pass}>
<button on:click={auth}>Log In</button>
<button on:click={register}>Register</button>

<style>
	input {
		width: 100px;
	}
</style>