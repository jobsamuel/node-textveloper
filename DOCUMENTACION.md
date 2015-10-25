<p align="center">
    <img alt="venezuela-js" src="http://i.imgur.com/AtL4NhK.png" width="auto">
</p>
<p align="center">
  Documentación completa de la librería Textveloper
</p>

----

# índice

1. [Requisitos](#requisitos)
2. [Instalación](#instalación)
3. [API](#api)
4. [Referencias](#refencias)
5. [Licencia](#licencia)

# requisitos

* [Node](https://nodejs.org/en/)
* [Una cuenta en Textveloper](http://textveloper.com/)

# instalación

```bash
$ npm install textveloper --save
```

# uso del módulo

```js
// Incluir el módulo en tu proyecto
import Textveloper from 'textveloper';

// Incluir los token de acceso al API de Textveloper
const cuentaToken = process.env.TEXTVELOPER_CUENTA_TOKEN || '<CUENTA-TOKEN>';
const subcuentaToken = process.env.TEXTVELOPER_SUBCUENTA_TOKEN || '<SUBCUENTA-TOKEN>';

// Crear una nueva instancia de Textveloper
const sms = new Textveloper(cuentaToken, subcuentaToken);

// Enviar un SMS
sms.enviar({
  telefono: '04141234567', 
  mensaje: 'Probando el módulo textveloper.' 
}, function(err, respuesta) {
    if (err) {
      // haz algo con el error.
    }
    // haz algo con la respuesta.
});
```

> **Importante**: Se deben solicitar los token de acceso en la página de [Textveloper](http://textveloper.com/). Además, se recomienda definirlos como variables de entorno para mayor seguridad.

# api

A continuación se describen los métodos disponibles en la librería **textveloper**.

### Enviar `enviar(config, callback)`

Envía un SMS a un destinatario y retorna una respuesta con el resultado de la operación.

#### argumentos

`config` Define el número telefónico y mensaje que se desea enviar. Debe ser un *object*. Los valores requeridos son:

* `numero`: Número telefónico del destinatarios del SMS. Debe ser un *string* y poseer obligatoriamente uno de los siguientes prefijos: 0414, 0424, 0426, 0416.

* `mensaje`: Texto que desea enviar al destinatario. Debe ser un *string* y **poseer un máximo de 145 caracteres**.

`callback` Función que será llamada una vez procesada la consulta. La misma retorna dos argumentos: err y respuesta.

#### ejemplo

Ejemplo.js
```js
// ...

sms.enviar({
  telefono: '04141234567', 
  mensaje: 'Probando el módulo textveloper.' 
}, function(err, respuesta) {
    if (err) {
      return console.log(err);
    }
    
    console.log(respuesta);
});
```

El resultado será:
```json
{
  "transaccion": "exitosa",
  "mensaje_transaccion": "MENSAJE_ENVIADO"
}

```

### Puntos `puntos(cuenta, callback)`

Consulta los puntos disponibles en una cuenta y retorna una respuesta con el resultado de la operación.

#### argumentos

`cuenta` (opcional) Define la cuenta que se va a consultar. Debe ser un *string*. Las opciones disponibles son:

* **cuenta**: Puntos disponibles en la *cuenta*.
* **subcuenta**: Puntos disponibles en la *subcuenta* correspondiente al `subcuentaToken` utilizado al definir la instancia de Textveloper.

<sup>De no colocarse opción alguna, se retornan por defecto los puntos disponibles en <b>cuenta</b>.</sup>

`callback` Función que será llamada una vez procesada la consulta. La misma retorna dos argumentos: err y respuesta.

#### ejemplo

Ejemplo.js
```js
// ...

sms.puntos('subcuenta', function(err, respuesta) {
    if (err) {
      return console.log(err);
    }
    
    console.log(respuesta);
});
```

El resultado será:
```json
{
  "transaccion": "exitosa",
  "puntos_enviados": "99",
  "total_puntos": "1000",
  "puntos_disponibles":"901"
}
```

### Historial `historial(tipo, callback)`

Consulta el historial registrado en una cuenta y retorna una respuesta con el resultado de la operación.

#### argumentos

`tipo` (opcional) Define el historial a consultar. Debe ser un *string*. Las opciones disponibles son:

* **envios**: SMS enviados por la *cuenta*.
* **compras**: Puntos adquiridos para la *cuenta*.
* **transferencias**: Puntos transferidos a la *subcuenta* correspondiente al `subcuentaToken` utilizado al definir la instancia de Textveloper.

<sup>De no colocarse opción alguna, se retorna por defecto el historial de <b>envios</b>.</sup>

`callback` Función que será llamada una vez procesada la consulta. La misma retorna dos argumentos: err y respuesta.

#### ejemplo

Ejemplo.js
```js
// ...

sms.historial('envios', function(err, respuesta) {
    if (err) {
      return console.log(err);
    }
    
    console.log(respuesta);
});
```

El resultado será:
```json
{
  "transaccion": "exitosa",
  "historico": [
    {
      "codigo_log": "123456",
      "telefono": "04141234567",
      "estatus": "Enviado",
      "mensaje": "SMS muy viejo",
      "fecha": "2015-06-26 05:26:52"
    },
    {
      "codigo_log": "123457",
      "telefono": "04141234567",
      "estatus": "Enviado",
      "mensaje": "SMS no tan viejo",
      "fecha": "2015-8-30 07:14:33"
    },
    { ...más_datos... }
  ]
}
```

# referencias

* [Textveloper](http://textveloper.com/)

# licencia

Licencia [MIT](http://opensource.org/licenses/MIT) :copyright: Jobsamuel Núñez