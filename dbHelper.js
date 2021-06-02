const {Pool, Client} = require('pg');
const bcrypt = require('bcrypt');

class DBHelper {
	constructor() {
		//"postgresql:/mvi:llaswe@localhost/mvi"
		this.client = new Client({
			user: 'mvi',
			host: 'localhost',
			database: 'mvi',
			password: 'llaswe',
		});
		this.client.connect();
	}

	genToken() {
		const abc = 'abcdefghijklmnopqrstuvwxyz1234567890';
		let token = '';
		for (let i = 0; i < 38; i++) {
			let index = Math.floor(Math.random() * abc.length);
			token += abc[index];
		}

		return token;
	}

	register(user, pass) {
		let logged = this.login(user, pass);
		if (logged != '' && logged != undefined) {
			return {user: user, token: logged};
		}
		let hash = bcrypt.hashSync(pass, 10);
		let token = this.genToken();
		this.client.query('INSERT INTO users (username, passw, token) VALUES ($1, $2, $3)', [user, hash, token]);
		console.log("New user registered");
		return {user: user, token: token};
	}

	async login(user, pass_in) {
		let pass = await this.client.query('select passw from users where username=$1', [user]);
		if (pass.rows[0] == undefined) {
			return '';
		}
		if (bcrypt.compareSync(pass_in, pass.rows[0].passw)){
			let token = this.genToken();
			this.client.query('update users set token=$1', [token]);
			console.log('Logged in');
			console.log(token);
			return token;
		}
		else {
			return '';
		}
	}

	async checkAuth(user, token) {
		let userDB = await this.client.query('select token from users where username=$1', [user]);
		if (userDB.rows[0] == undefined) {
			return false;
		}
		if (userDB.rows[0].token == token) {
			console.log('auth check passed');
			return true;
		}
		else {
			return false;
		}
	}
}

module.exports = new DBHelper();