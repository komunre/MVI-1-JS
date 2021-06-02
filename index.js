const express = require('express');
const fs = require('fs');
const app = express();
const cookieParser = require('cookie-parser');

const db = require('./dbHelper');
let cpuClass = require('./core/cpu');

let cpus = [];

app.use('/build', express.static(__dirname + '/svelte/public/build'));
app.use('/', express.static(__dirname + '/public'));
app.use(express.json());
app.use('/', express.static(__dirname + '/svelte/public'));
app.use(cookieParser());

app.get('/', (req, res) => {
	fs.readFile(__dirname + "/svelte/public/index.html", (err, data) => {
		if (err) {
			console.error(err);
		}
		res.send(data.toString());
	})
});

app.post('/api', async (req, res) => {

	if (req.body.type == 'login') {
		let token = await db.login(req.body.user, req.body.pass);
		if (token != '') {
			res.cookie('token', token).cookie('user', req.body.user).send();
		}
		else {
			res.send({err: 'wrong login or password'});
		}
		return;
	}
	if (req.body.type == 'register') {
		let user = await db.register(req.body.user, req.body.pass);
		res.cookie('user', user.user).cookie('token', user.token).send();
		return;
	}
	let cpuNum = -1;
	if (req.cookies.user == undefined || req.cookies.token == undefined || !await db.checkAuth(req.cookies.user, req.cookies.token)){
		res.send({err: "Not authenticated"});
		return;
	}
	else {
		for (let i = 0; i < cpus.length; i++) {
			if (cpus[i].user == req.cookies.user) {
				cpuNum = i;
			}
		}
		if (cpuNum == -1) {
			cpuNum = cpus.length;
			cpus.push({user: req.cookies.user, cpu: new cpuClass()});
			console.dir(cpus);
		}
	}
	if (req.body.type == "program") {
		if (!fs.existsSync(__dirname + `/programs/${req.cookies.user}/main.asm`)) {
			fs.mkdirSync(`${__dirname}/programs/${req.cookies.user}/`);
			fs.writeFileSync(`${__dirname}/programs/${req.cookies.user}/main.asm`, "mov 1 1\nmov 0 1");
		}
		fs.readFile(__dirname + `/programs/${req.cookies.user}/main.asm`, (err, data) => {
			if (err) {
				console.error(err);
				res.send(err);
				return;
			}
			
			console.log(`Sending ${data}...`);
			res.send({program: data.toString()});
		})
	}
	else if (req.body.type == 'save') {
		cpus[cpuNum].cpu.load(req.body.program);
		fs.writeFile(__dirname + `/programs/${req.cookies.user}/main.asm`, req.body.program, () => {});
	}
	else if (req.body.type == 'step') {
		let data = cpus[cpuNum].cpu.step();
		res.send(data);
	}
	else if (req.body.type == 'mem') {
		cpus[cpuNum].cpu.setDataMem(req.body.index, req.body.value);
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