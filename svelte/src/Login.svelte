<script>
	let user = '';
	let pass = '';
	let req = new XMLHttpRequest();

	function auth() {
		req.open("POST", "/api");
		req.setRequestHeader('Content-Type', 'application/json');
		req.onload = () => {
			location.reload();
		}
		req.send(JSON.stringify({type: "login", user: user, pass: pass}));
	}

	function register() {
		req.open("POST", "/api");
		req.setRequestHeader('Content-Type', 'application/json');
		req.onload = () => {
			location.reload();
		}
		req.send(JSON.stringify({type: "register", user: user, pass: pass}));	
	}
</script>

<p id="warn">Please use new password for this site</p>
<input type="text" bind:value={user}>
<input type="password" bind:value={pass}>
<button on:click={auth}>Log In</button>
<button on:click={register}>Register</button>

<style>
	input {
		width: 100px;
	}

	#warn {
		font-size: 14px;
		color: rgb(255, 201, 22);
	}
</style>