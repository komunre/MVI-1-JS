<script>
	let running = false;
	let program = "";
	let counter = 0;
	let changed = 0;
	let memHighLight;
	let memory = [];
	let accum = 0;
	let err = "";
	let req = new XMLHttpRequest();
	let cmdLen = 1024;
	req.open("POST", "/api");
	req.onload = () => {
		let parsed = JSON.parse(req.response);
		err = parsed.err;
		program = parsed.program;
	}
	req.setRequestHeader("Content-Type", "application/json")
	req.send(JSON.stringify({type: "program"}));

	$: {
		if (changed > 0) {
			sendChanges(program);
		}
		changed++;
	}

	function sendChanges(program) {
		req.open("POST", "/api");
		req.setRequestHeader('Content-Type', 'application/json');
		req.send(JSON.stringify({type: "save", program: program}));
	}

	function getMemData(mem) {
		return mem.split(': ')[1];
	}

	function drawScreen() {
		let screen = document.getElementById("screen");
		let ctx = screen.getContext('2d');
		console.log("Drawing screen...");
		if (getMemData(memory[1 + cmdLen]) == 1) {
			ctx.fillStyle = 'black';
			ctx.fillRect(0, 0, 150*2, 150);
		}
		ctx.fillStyle = 'white';
		ctx.fillRect(getMemData(memory[2 + cmdLen]), getMemData(memory[3 + cmdLen]), 10, 10);
	}

	function doStep() {
		console.log("requesting step...");
		req.open("POST", "/api");
		req.onload = () => {
			console.log("Response got");
			console.log(req.response);
			let parsed = JSON.parse(req.response);
			memory = parsed.mem;
			memHighLight = memory[parsed.counter];
			counter = parsed.counter;
			accum = parsed.accum;
			console.log(memory);
			err = parsed.err;
			cmdLen = parsed.cmdLen;

			drawScreen();
		}
		req.setRequestHeader('Content-Type', 'application/json');
		req.send(JSON.stringify({type: "step"}));
	}

	$: if (running) {
		counter;
		doStep();
		if (counter > memory.length || (memory[counter] != null && memory[counter].includes("undefined"))) {
			running = false;
		}
	}
	function runProgram() {
		running = !running;
		doStep();
	}

	function sendMemToServer(index, value) {
		req.open('POST', '/api');
		req.setRequestHeader('Content-Type', 'application/json');
		req.send(JSON.stringify({type: 'mem', index: index, value: value}));
	}

</script>

<textarea id="edit" bind:value={program}></textarea>
<div>
	<p>Error: {err}</p>
	<p>Accum: {accum}</p>
	<p>Memory: {memory.length}</p>
</div>
<div id="mem">
{#each memory as mem}
{#if mem == memHighLight}
<p class="hl">{mem} (Current)</p>
{:else}
<p>{mem}</p>
{/if}
{/each}
</div>
<button on:click={doStep}>Step</button>
<button on:click={runProgram}>Run</button>
<div id="screen-div">
	<canvas id="screen">Your browser doesn't support canvs. No screen, sorry</canvas>
	<script>
		let screen = document.getElementById("screen");
		screen.fillRect(0, 0, 150, 150);
	</script>

	<button on:click={() => {sendMemToServer(4, 10)}}>Button1</button>
	<button on:click={() => {sendMemToServer(4, 20)}}>Button2</button>
	<button on:click={() => {sendMemToServer(4, 30)}}>Button3</button>
	<button on:click={() => {sendMemToServer(4, 40)}}>Button4</button>
	<button on:click={() => {sendMemToServer(4, 50)}}>Button5</button>
	<button on:click={() => {sendMemToServer(4, 60)}}>Button6</button>
</div>

<style>
	#edit {
		text-align: left;
		position: absolute;
		width: 55%;
		height: 80%;
		left: 180px;
		right: 150px;
		top: 50px;
		bottom: 50px;
		background-color: #43a0b7;
		resize: none;
		font-family: 'Inconsolata-VariableFont_wdth,wght.ttf';
	}

	.hl {
		background-color: aquamarine;
	}

	#mem {
		overflow-y: scroll;
		height: 300px;
		width: 148px;
		word-wrap: break-word;
	}

	#screen-div {
		position: absolute;
		left: calc(55% + 180px);
		top: 50px;
		width: 200px;
		height: 200px;
	}
	#screen {
		width: 150px;
		height: 150px;
		border: 3px solid black;
	}
</style>