'use strict';

import request from 'request';

class Textveloper {
	constructor({ cuenta_token, aplicacion_token }) {
		if (!cuenta_token || !aplicacion_token) {
			const msj = 'Se requieren los parámetros \'cuenta_token\' y \'aplicacion_token\'.';

			throw new Error(msj);
		} 

		if (typeof cuenta_token !== 'string' || typeof aplicacion_token !== 'string') {
			const msj = 'Los parámetros \'cuenta_token\' y \'aplicacion_token\' deben ser string.';

			throw new Error(msj);
		}

		this._cuenta_token = cuenta_token;
		this._aplicacion_token = aplicacion_token;
	}

	enviar({ telefono, mensaje }, callback) {
		if (!telefono || !mensaje) {
			const msj = 'Se requieren los parámetros \'telefono\' y \'mensaje\' para enviar un SMS.';

			throw new Error(msj);
		} 

		if (typeof telefono !== 'string' || typeof mensaje !== 'string') {
			const _error = JSON.stringify({
				mensaje: 'El \'telefono\' y/o \'mensaje\' son inválidos.',
				codigo: 'PARAMETROS_INVALIDOS',
				detalle: `Se esperaba que 'telefono' y 'mensaje' fuesen string, pero ` +
				`se recibió ${typeof telefono} y ${typeof mensaje}.`
			});

			return callback(_error);
		} 

		if (!telefono.startsWith('0')) {
			const _error = JSON.stringify({
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
				const _error = JSON.stringify({
					mensaje: 'Falló intento de envío de SMS.',
					codigo: 'SMS_FALLIDO',
					detalle: error.message
				});

				return callback(_error); 
			} 

			if (response.statusCode !== 200) {
				const _error = JSON.stringify({
					mensaje: 'El SMS no pudo ser procesado.',
					codigo: 'SMS_NO_PROCESADO',
					detalle: JSON.parse(body).detalle || 'n/a'
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
				const _error = JSON.stringify({
					mensaje: 'Falló intento de consulta de información.',
					codigo: 'CONSULTA_FALLIDA',
					detalle: error.message
				});

				return callback(_error);
			}

			if (response.statusCode !== 200) {
				const _error = JSON.stringify({
					mensaje: 'La consulta de información no pudo ser procesada.',
					codigo: 'CONSULTA_NO_PROCESADA',
					detalle: JSON.parse(body).detalle || 'n/a'
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

	historial(opciones, callback) {
		if (!opciones || !callback) {
			const msj = 'Se requieren los argumentos \'opciones\' y \'callback\' para consultar el historial.';

			throw new Error(msj);
		}

		if (typeof opciones === 'object' && !opciones.telefono) {
			const msj = 'Se requiere el parámetro \'teléfono\' para consultar el historial.';

			throw new Error(msj);
		}

		if (typeof opciones !== 'object' && typeof opciones !== 'string') {
			const msj = `Se esperaba que el argumento 'opciones' fuese object o string, ` +
				`pero se recibió ${typeof opciones}.`;

			throw new Error(msj);
		}

		if (typeof callback !== 'function') {
			const msj = `Se esperaba que el argumento 'callback' fuese function, ` +
				`pero se recibió ${typeof callback}.`;

			throw new Error(msj);
		}

		if ((opciones.telefono && !opciones.telefono.startsWith('0')) || (typeof opciones === 'string' && !opciones.startsWith('0'))) {
			const _error = JSON.stringify({
				mensaje: 'Número telefónico inválido.',
				codigo: 'TELEFONO_INVALIDO',
				detalle: 'El teléfono debe poseer obligatoriamente uno de los siguientes ' +
				'prefijos: 0412, 0414, 0424, 0426, 0416.',
			});

			return callback(_error);
		}

		const form = {
			cuenta_token: this._cuenta_token,
			telefono: opciones.telefono || opciones,
			pagina: opciones.pagina || 1
		};

		let endpoint;

		if (opciones.tipo && (opciones.tipo === 'enviados' || opciones.tipo === 'recibidos')) {
			endpoint = opciones.tipo;
		} else {
			endpoint = 'enviados';
		}

		const config = {
			url: `http://api.textveloper.com/sms/log/${endpoint}/`,
			method: 'POST',
			form
		};

		request(config, function(error, response, body) {
			if (error) {
				const _error = JSON.stringify({
					mensaje: 'Falló intento de consulta del historial.',
					codigo: 'CONSULTA_FALLIDA',
					detalle: error.message
				});

				return callback(_error);
			}

			if (response.statusCode !== 200) {
				const _error = JSON.stringify({
					mensaje: 'La consulta del historial no pudo ser procesada.',
					codigo: 'CONSULTA_NO_PROCESADA',
					detalle: JSON.parse(body).detalle || 'n/a'
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
}

export default Textveloper;
