const express = require('express');
const fs = require('fs');
const app = express();

let cpu = require('./core/cpu');

app.use('/build', express.static(__dirname + '/svelte/public/build'));
app.use('/', express.static(__dirname + '/public'));
app.use(express.json());
app.use('/', express.static(__dirname + '/svelte/public'));

app.get('/', (req, res) => {
	fs.readFile(__dirname + "/svelte/public/index.html", (err, data) => {
		if (err) {
			console.error(err);
		}
		res.send(data.toString());
	})
});

app.post('/api', (req, res) => {
	console.log("API request");
	console.dir(req.body);
	if (req.body.type == "program") {
		fs.readFile(__dirname + '/programs/main.asm', (err, data) => {
			if (err) {
				console.error(err);
				res.send(err);
			}
			
			console.log(`Sending ${data}...`);
			res.send({program: data.toString()});
		})
	}
	else if (req.body.type == 'save') {
		cpu.load(req.body.program);
		fs.writeFile(__dirname + '/programs/main.asm', req.body.program, () => {});
	}
	else if (req.body.type == 'step') {
		doCpuStep(res);
	}
	else if (req.body.type == 'mem') {
		cpu.setDataMem(req.body.index, req.body.value);
		doCpuStep(res);
	}
	else {
		res.send({err: "unknown"});
	}
})

function doCpuStep(res) {
	let data = cpu.step();
	res.send(data);
}

app.listen(process.env.PORT, () => {
	console.log(`listening on ${process.env.PORT}...`);
})