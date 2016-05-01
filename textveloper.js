'use strict';

import request from 'request';

class Textveloper {
	constructor({ cuenta_token, aplicacion_token }) {
		if (!cuenta_token || !aplicacion_token) {
			throw new Error('Se requieren los parámetros \'cuenta_token\' y \'aplicacion_token\'.');
		} 

		if (typeof cuenta_token !== 'string' || typeof aplicacion_token !== 'string') {
			throw new Error('Los parámetros \'cuenta_token\' y \'aplicacion_token\' deben ser string.');
		}

		this._cuenta_token = cuenta_token;
		this._aplicacion_token = aplicacion_token;
	}

	enviar({ telefono, mensaje }, callback) {
		if (!telefono || !mensaje) {
			throw new Error('Se requieren los parámetros \'telefono\' y \'mensaje\' para enviar un SMS.');
		} 

		if (typeof telefono !== 'string' || typeof mensaje !== 'string') {
			const _error = new Error(_mensaje);
			_error.message = JSON.stringify({
				mensaje: 'El \'telefono\' y/o \'mensaje\' son inválidos.',
				codigo: 'PARAMETROS_INVALIDOS',
				detalle: `Se esperaba que 'telefono' y 'mensaje' fuesen string, pero ` +
				`se recibió ${typeof telefono} y ${typeof mensaje}.`
			});

			return callback(_error);
		} 

		if (!telefono.startsWith('0')) {
			const _error = new Error();
			_error.message = JSON.stringify({
				mensaje: 'Número telefónico inválido.',
				codigo: 'TELEFONO_INVALIDO',
				detalle: 'El parámetro \'telefono\' debe poseer obligatoriamente ' +
				'uno de los siguientes prefijos: 0412, 0414, 0424, 0426, 0416.',
			});
			
			return callback(_error);
		}

		const form = {
			cuenta_token: this._cuenta_token,
			aplicacion_token: this._aplicacion_token,
			telefono, 
			mensaje 
		};

		const config = {
			url: 'http://api.textveloper.com/sms/enviar/',
			method: 'POST',
			form
		};

		request(config, function(error, response, body) {
			if (error) {
				const _error = new Error();
				_error.message = JSON.stringify({
					mensaje: 'Falló intento de envío de SMS.',
					codigo: 'SMS_FALLIDO',
					detalle: error.message
				});

				return callback(_error); 
			} 

			if (response.statusCode !== 200) {
				const _error = new Error();
				_error.message = JSON.stringify({
					mensaje: 'El SMS no pudo ser procesado.',
					codigo: 'SMS_NO_PROCESADO',
					detalle: JSON.parse(body).detalle
				});

				return callback(_error);
			}

			const resultado = JSON.stringify({
				mensaje: JSON.parse(body).detalle,
				codigo: 'SMS_PROCESADO',
				detalle: 'n/a'
			});
			
			callback(null, resultado);
		});
	}

	cuenta(callback) {
		const form = {
			cuenta_token: this._cuenta_token,
			aplicacion_token: this._aplicacion_token,
		};

		const config = {
			url: 'http://api.textveloper.com/aplicacion/detalle/',
			method: 'POST',
			form
		};

		request(config, function(error, response, body) {
			if (error) {
				const _error = new Error();
				_error.message = JSON.stringify({
					mensaje: 'Falló intento de consulta de información.',
					codigo: 'CONSULTA_FALLIDA',
					detalle: error.message
				});

				return callback(_error); 
			}

			if (response.statusCode !== 200) {
				const _error = new Error();
				_error.message = JSON.stringify({
					mensaje: 'La consulta de información no pudo ser procesada.',
					codigo: 'CONSULTA_NO_PROCESADA',
					detalle: JSON.parse(body).detalle
				});

				return callback(_error);
			}

			const resultado = JSON.stringify({
				codigo: 'CONSULTA_PROCESADA',
				data: JSON.parse(body)
			});
			
			callback(null, resultado);
		});
	}

	// Obsoleto
	historial(tipo, callback) {
		const form = {
			cuenta_token: this._cuentaToken,
			subcuenta_token: this._subcuentaToken
		};
		let url = 'http://api.textveloper.com/historial-envios/';
		let cb = callback;

		if (!tipo) {
			throw new Error('El primer argumento debe se un string o un callback function.');
		} else if (typeof tipo === 'string') {
			if (tipo === 'transferencias') {
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
}

export default Textveloper;
