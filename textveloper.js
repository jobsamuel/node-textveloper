'use strict';

import request from 'request';

function Textveloper({ cuentaToken, subcuentaToken }) {
	if (!cuentaToken || !subcuentaToken) {
		throw new Error('Debe colocar los parámetros cuentaToken y subcuentaToken.');
	}

	this._cuentaToken =  cuentaToken;
	this._subcuentaToken = subcuentaToken;
}

Textveloper.prototype.enviar = function({ telefono, mensaje }, callback) {
	if (!telefono || !mensaje) {
		throw new Error('Debe colocar los parámetros telefono y mensaje para enviar un SMS.');
	}

	const form = {
		cuenta_token: this._cuentaToken,
		subcuenta_token: this._subcuentaToken,
		telefono, 
		mensaje 
	};
	const config = {
		url: 'http://api.textveloper.com/enviar/',
		method: 'POST',
		form
	};

	request(config, function(err, response, body) {
		if (err) {
			const _err = new Error(err);
			return callback(_err); 
		} else if (response.statusCode !== 200) {
			const _err = new Error(body);
			return callback(_err);
		} else {
			return callback(null, body);
		}
	});
}

Textveloper.prototype.saldo = function(cuenta, callback) {
	const form = {
		cuenta_token: this._cuentaToken
	};
	let url = 'http://api.textveloper.com/saldo-cuenta/';
	let cb = callback;

	if (!cuenta) {
		throw new Error('El primer argumento debe se un string o un callback function.');
	} else if (typeof cuenta === 'string' && cuenta !== 'cuenta') {
		if (cuenta === 'subcuenta') {
			url = 'http://api.textveloper.com/saldo-subcuenta/';
			form.subcuenta_token = this._subcuentaToken;
		}
	} else if (typeof cuenta === 'function') {
		cb = cuenta;
	} else {
		throw new Error(`Se esperaba un string o un callback function, pero se obtuvo un ${typeof cuenta}`);
	}

	const config = {
		method: 'POST',
		url,
		form
	};

	request(config, function(err, response, body) {
		if (err) {
			const _err = new Error(err);
			return cb(_err); 
		} else if (response.statusCode !== 200) {
			const _err = new Error(body);
			return cb(_err);
		} else {
			return cb(null, body);
		}
	});
}

Textveloper.prototype.historial = function(tipo, callback) {
	const form = {
		cuenta_token: this._cuentaToken,
		subcuenta_token: this._subcuentaToken
	};
	let url = 'http://api.textveloper.com/historial-envios/';
	let cb = callback;

	if (!tipo) {
		throw new Error('El primer argumento debe se un string o un callback function.');
	} else if (typeof tipo === 'string' && tipo !== 'cuenta') {
		if (tipo === 'subcuenta') {
			url = 'http://api.textveloper.com/historial-transferencias/';
		} else if (tipo === 'compras') {
			url = 'http://api.textveloper.com/historial-compras/';
		}
	} else if (typeof tipo === 'function') {
		cb = tipo;
	} else {
		throw new Error(`Se esperaba un string o un callback function, pero se obtuvo un ${typeof tipo}`);
	}

	const config = {
		method: 'POST',
		url,
		form
	};

	request(config, function(err, response, body) {
		if (err) {
			const error = new Error(err);
			return cb(error); 
		} else if (response.statusCode !== 200) {
			const error = new Error(body);
			return cb(error);
		} else {
			return cb(null, body);
		}
	});
}

export default Textveloper;
