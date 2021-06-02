<script>
	let operators = "[<, >, =]";
</script>

<div class="about">
	<h1>Developers</h1>
	<p>komunre</p>
	<h1>What is this</h1>
	<p>This is my Assembler-like sandbox! You can do any calculations here and even draw something on screen!</p>
	<h1>Components memory access</h1>
	<h2>Videocard</h2>
	<p>1 - clear (boolean)</p>
	<p>2 - X</p>
	<p>3 - Y</p>

	<h2>Buttons</h2>
	<p>4 - which button is active (button number * 10)</p>

	<h1>Instructions</h1>
	<p>ACC - accumulator</p>
	<p>M - memory</p>
	<p>I - integer</p>
	<br/>
	<p>mov ACC/I, ACC/M</p>
	<p>add M/I</p>
	<p>sub M/I</p>
	<p>div M/I</p>
	<p>mul M/I</p>
	<p>[any]:</p>
	<p>test ACC/I {operators} ACC/I</p>
	<p>tjmp [any]</p>
	<p>fjmp [any]</p>
	<p>jmp [any]</p>
	<p>xchg M</p>

	<h1>Memory guide</h1>
	<p>Memory is numbers or strings in a list. You can see this list on the left side of screen. You can write to memory using something like <b>mov 123 1</b> or read using <b>mov [1] acc</b>. There is a lot more memory than just one. Use it until it overflows</p>

	<h1>Loops guide</h1>
	<p>Mark something with <b>label_name:</b> and then use <b>jmp label_name</b>, <b>tjmp label_name</b> or <b>fjmp label_name</b></p>
	<p>You can use <b>test [var] {operators} [var]</b> to test something and after use <b>tjmp</b> (true jump) or <b>fjmp</b> (false jump)</p>
</div>

<style>
	.about {
		position: fixed;
		width: 300px;
		height: 100%;
		top: 0px;
		left: 50%;
		text-align: center;
		background-color: chocolate;
		overflow-y: scroll;
		color: black;
	}
</style>