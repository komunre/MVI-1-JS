const { time, timeStamp } = require("console");

class Memory {
	constructor() {
		this.mem = [];
		this.pseudoMem = [];
		this.err = "";
		this.cmdLen = 1024;
		this.memLen = 1024;
		this.marks = [];
	}

	getErr() {
		return this.err;
	}
	
	getCmdLen() {
		return this.cmdLen;
	}

	getMemIndex(index) {
		return this.mem[index];
	}
	
	getDataMemIndex(index) {
		return this.mem[index + this.cmdLen];
	}

	getMem(index) {
		let memNums = [];
		for (let i = 0; i < this.mem.length; i++) {
			memNums.push(`${i}: ${this.mem[i]}`);
		}
		return memNums;
	}

	setMemIndex(index, value) {
		this.mem[index] = value;
	}

	setMemDataIndex(index, value) {
		this.mem[index + this.cmdLen] = value;
	}

	loadInstructions(str) {
		this.err = "";
		this.mem = [];
		this.pseudoMem = [];
		let currToken = "";
		let instruction;
		let status = 'begin';

		console.log(`Reading ${str.length} characters...`);
		str = str.concat('\n');

		for (let i = 0; i < str.length; i++) {
			switch (status) {
				case 'begin':
					switch (str[i]) {
						case '\n':
						break;
						case ':':
						case ' ':
							instruction = new Instruction(currToken);
							status = 'args';
							currToken = "";
						break;
						default:
							currToken += str[i];
						break;
					}
				break;
				case 'args':
					switch (str[i]) {
						case ' ':
							instruction.addArg(currToken);
							currToken = "";
						break
						case '\n':
							instruction.addArg(currToken);
							this.pseudoMem.push(instruction);
							status = 'begin';
							currToken = "";
							instruction = null;
						break;
						default:
							currToken += str[i];
						break;
					}
				break;
			}
		}

		console.dir(this.pseudoMem);
	}

	jumpToIndex(mark) {
		console.dir(this.marks);
		for (let i = 0; i < this.marks.length; i++) {
			if (this.marks[i].cmd == mark) {
				return this.marks[i].step;
			}
			else{
				console.log(`${mark}:${this.marks[i].cmd}`);
			}
		};
		this.err = "Wrong jump";
		return -1;
	}

	parseToMem() {
		this.marks = [];
		console.log(`Reading ${this.pseudoMem.length} instructions`);
		for (let i = 0; i < this.pseudoMem.length; i++) {
			console.log(this.pseudoMem[i].getName());
			switch (this.pseudoMem[i].getName()) {
				case 'mov':
					this.mem.push(1);
					this.mem.push(this.pseudoMem[i].getArg(0));
					/*if (this.pseudoMem[i].getArg(1) + cmdLen > cmdLen + memLen || this.pseudoMem[i].getArg(0) > cmdLen) {
						this.err = "Wrong memory address";
						return;
					}*/
					this.mem.push(this.pseudoMem[i].getArg(1));
				break;
				case 'add':
					this.mem.push(2);
					this.mem.push(this.pseudoMem[i].getArg(0));
				break;
				case 'sub':
					this.mem.push(3);
					this.mem.push(this.pseudoMem[i].getArg(0));
				break;
				case 'jmp':
					this.mem.push(4);
					this.mem.push(this.pseudoMem[i].getArg(0));
				break;
				case 'test':
					this.mem.push(5);
					this.mem.push(this.pseudoMem[i].getArg(0));
					this.mem.push(this.pseudoMem[i].getArg(1));
					this.mem.push(this.pseudoMem[i].getArg(2));
				break;
				case 'tjmp':
					this.mem.push(6);
					this.mem.push(this.pseudoMem[i].getArg(0));
				break;
				case 'fjmp':
					this.mem.push(7);
					this.mem.push(this.pseudoMem[i].getArg(0));
				break;
				case 'mul':
					this.mem.push(8);
					this.mem.push(this.pseudoMem[i].getArg(0));
				break;
				case 'xchg':
					this.mem.push(9);
					this.mem.push(this.pseudoMem[i].getArg(0));
				break;
				case 'div':
					this.mem.push(10);
					this.mem.push(this.pseudoMem[i].getArg(0));
				break;
				default:
					this.marks[this.marks.length] = {cmd: this.pseudoMem[i].getName(), step: this.mem.length - 1};
					this.mem.push(this.pseudoMem[i].getName());
					//this.err = "Wrong instruction";
				break;
			}
			if (this.mem.length > this.cmdLen + this.memLen) {
				this.err = "Memory overflow";
				return;
			}
		}
	}
}


class Instruction {
	constructor(name) {
		this.name = name;
		this.args = [];
	}

	addArg(value) {
		this.args.push(value);
	}

	getArg(index) {
		return this.args[index];
	}

	getName() {
		return this.name;
	}
}

module.exports = Memory;