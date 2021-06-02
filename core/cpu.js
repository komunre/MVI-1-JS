const { timeStamp } = require('console');
const memory = require('./memory');

class CPU {
	constructor() {
		this.counter = 0;
		this.currCmd = 0;
		this.accum = 0;
		this.memory = new memory();
		this.t = 0;
	}

	resetCounter() {
		this.counter = 0;
	}

	readMem() {
		
	}

	setDataMem(index, value) {
		this.memory.setMemDataIndex(index, value);
	}

	jump() {
		this.counter++;

	}
	
	exec(cmd) {

	}
	
	load(instructions) {
		this.counter = 0;
		this.currCmd = 0;
		this.memory.loadInstructions(instructions);
		this.memory.parseToMem();
		console.dir(this.memory.getMem());
		if (this.memory.getErr() != "") {
			console.log(this.memory.getErr());
		}
		console.log("Cpu is loaded");
	}

	jumpTo(mark) {
		this.counter = this.memory.jumpToIndex(mark);
		console.log(`Jumping to ${this.counter}`);
	}

	getDataIndex(str) {
		return str.replace(/[\[\]]/g, '');
	}

	step() {
		console.log("Cpu step...");
		let cmd = this.memory.getMemIndex(this.counter);
		switch (cmd) {
			case 1:
				this.counter++;
				let num = this.memory.getMemIndex(this.counter);
				this.counter++;
				let memIndex = this.memory.getMemIndex(this.counter);
				if (!isNaN(num)) {
					if (memIndex != 0) {
						this.memory.setMemIndex(memIndex, Number(num));
					}
					else {
						this.accum = Number(num);
					}
				}
				else if (!isNaN(this.getDataIndex(num)) && memIndex == 0) {
					num = this.getDataIndex(num);
					console.log(`Getting ${num} data index to acc`);
					this.accum = this.memory.getDataMemIndex(Number(num));
				}
				else if (num == '[acc]') {
					this.memory.setMemIndex(memIndex, this.accum);
				}
				else {
					return;
				}
			break;
			case 2:
				this.counter++;
				let numOrMem = this.memory.getMemIndex(this.counter);
				if (!isNaN(numOrMem)) {
					this.accum += Number(numOrMem);
				}
				else {
					numOrMem = this.getDataIndex(numOrMem);
					this.accum += Number(this.memory.getDataMemIndex(Number(numOrMem)));
				}
			break;
			case 3:
				this.counter++;
				let numOrMemSub = this.memory.getMemIndex(this.counter);
				if (!isNaN(numOrMemSub)) {
					this.accum -= Number(numOrMemSub);
				}
				else {
					numOrMemSub = this.getDataIndex(numOrMemSub);
					this.accum -= Number(this.memory.getDataMemIndex(Number(numOrMemSub)));
				}
			break;
			case 4:
				this.counter++;
				let mark = this.memory.getMemIndex(this.counter);
				console.log(`Mark: ${mark}`);
				this.jumpTo(mark);
			break;
			case 5:
				this.counter++;
				let numOrMemT = this.memory.getMemIndex(this.counter);
				this.counter++;
				let action = this.memory.getMemIndex(this.counter);
				this.counter++;
				let numOrMemT2 = this.memory.getMemIndex(this.counter);
				if (!isNaN(numOrMemT)) {
					numOrMemT = Number(numOrMemT);
				}
				else {
					numOrMemT = this.getDataIndex(numOrMemT);
					if (numOrMemT == 'acc') {
						numOrMemT = this.accum;
					}
				}
				if (!isNaN(numOrMemT2)) {
					numOrMemT2 = Number(numOrMemT2);
				}
				else {
					numOrMemT2 = this.getDataIndex(numOrMemT2);
					if (numOrMemT2 == 'acc') {
						numOrMemT2 = this.accum;
					}
				}

				switch (action) {
					case '=':
						this.t = numOrMemT == numOrMemT2;
					break;
					case '>':
						this.t = numOrMemT > numOrMemT2;
					break;
					case '<':
						this.t = numOrMemT < numOrMemT2;
					break;
				}
			break;
			case 6:
				this.counter++;
				if (this.t == 1) {
					this.jumpTo(this.memory.getMemIndex(this.counter));
				}
			break;
			case 7:
				this.counter++;
				if (this.t == 0) {
					this.jumpTo(this.memory.getMemIndex(this.counter));
				}
			break;
			case 8:
				this.counter++;
				let numOrMemMul = this.memory.getMemIndex(this.counter);
				if (!isNaN(numOrMemMul)) {
					this.accum *= Number(numOrMemMul);
				}
				else {
					numOrMemMul = this.getDataIndex(numOrMemMul);
					this.accum *= Number(this.memory.getDataMemIndex(Number(numOrMemMul)));
				}
			break;
			case 9:
				this.counter++;
				let mmIndex = this.memory.getMemIndex(this.counter);
				let tmp = this.memory.getDataMemIndex(Number(mmIndex));
				this.memory.setMemDataIndex(Number(mmIndex), this.accum);
				this.accum = tmp;
			break;
			case 10:
				this.counter++;
				let numDiv = this.memory.getMemIndex(this.counter);
				if (!isNaN(numDiv)) {
					this.accum /= Number(numDiv);
				}
				else {
					numDiv = this.getDataIndex(numDiv);
					this.accum /= Number(this.memory.getDataMemIndex(Number(numDiv)));
				}
			break;
			default:
					
			break;
			/*case 2:
				this.counter++;
				let memPop = this.memory.getMemIndex(this.counter);
				this.accum = this.memory.getDataMemIndex(memPop);
			break;*/
		}
		this.counter++;
		this.currCmd++;

		return JSON.stringify({counter: this.counter, cmd: this.currCmd, mem: this.memory.getMem(), accum: this.accum, err: this.memory.getErr(), cmdLen: this.memory.getCmdLen()});
	}
}

module.exports = CPU;