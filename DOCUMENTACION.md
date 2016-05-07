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
4. [Referencias](#referencias)
5. [Licencia](#licencia)

# requisitos

* [Node 4](https://nodejs.org/en/) (o superior)
* [Una cuenta en Textveloper](http://textveloper.com/)

# instalación

```bash
$ npm install textveloper --save
```

# uso del módulo

```js
// Incluir el módulo en tu proyecto
import Textveloper from 'textveloper';

// Crear una nueva instancia de Textveloper e incluir tokens de acceso al API
const sms = new Textveloper({ 
  cuenta_token: '<CUENTA-TOKEN-TEXTVELOPER>', 
  aplicacion_token: '<APLICACION-TOKEN-TEXTVELOPER>'
});

// Enviar un SMS
sms.enviar({
  telefono: '04141234567', 
  mensaje: 'Probando el módulo textveloper.' 
}, function(error, respuesta) {
  if (error) {
    // hacer algo con el error.
  }
    
  // hacer algo con la respuesta.
});
```

> **Importante**: Se deben solicitar los token de acceso en la página de [Textveloper](http://textveloper.com/). Además, se recomienda definirlos como variables de entorno para mayor seguridad.

# api

### Textveloper `new Textveloper(tokens)`

Crea una nueva instancia de la clase **Textveloper**.

#### argumentos

`tokens` Define las llaves de acceso al API de [Textveloper](http://textveloper.com/). Debe ser un *object* con los siguientes parámetros:

* `cuenta_token` Llave que identifica su perfil (cuenta principal) en Textveloper. Debe ser un *string*.

* `aplicacion_token` Llave que identifica una aplicacion en Textveloper. Debe ser un *string*.

#### ejemplo

Ejemplo.js

```js
// ...

const sms = new Textveloper({
  cuenta_token: '<CUENTA-TOKEN-TEXTVELOPER>',
  aplicacion_token: '<APLICACION-TOKEN-TEXTVELOPER>'
});
```

### Enviar `enviar(config, callback)`

Envía un SMS a un destinatario y retorna una respuesta con el resultado de la operación.

#### argumentos

`config` Define el número telefónico y mensaje que se desea enviar. Debe ser un *object*. Los valores requeridos son:

* `numero` Número telefónico del destinatarios del SMS. Debe ser un *string* y poseer obligatoriamente uno de los siguientes prefijos: 0412, 0414, 0424, 0426, 0416.

* `mensaje` Texto que desea enviar al destinatario. Debe ser un *string* y **poseer un máximo de 145 caracteres**.

`callback` Función que será llamada una vez procesada la consulta. La misma retorna dos argumentos: _error_ y _respuesta_.

#### ejemplo

Ejemplo.js
```js
// ...

sms.enviar({
  telefono: '04141234567', 
  mensaje: 'Probando Textveloper con Node.' 
}, function(error, respuesta) {
    if (error) {
      return console.log(error);
    }
    
    console.log(respuesta);
});
```

El resultado será:
```json
{
  "mensaje": "El SMS fue encolado",
  "codigo": "SMS_PROCESADO",
  "detalle": "n/a"
}
```

### Cuenta `cuenta(callback)`

Consulta información acerca de una aplicación y retorna una respuesta con el resultado de la operación.

#### argumentos

`callback` Función que será llamada una vez procesada la consulta. La misma retorna dos argumentos: _error_ y _respuesta_.

#### ejemplo

Ejemplo.js
```js
// ...

sms.cuenta(function(error, respuesta) {
  if (error) {
    return console.log(error);
  }
    
  console.log(respuesta);
});
```

El resultado será:
```json
{
  "codigo": "CONSULTA_PROCESADA",
  "data": {
    "aplicacion": [
      {
        "web_hook_url": "http://tu.aplicacion.com/recibir/sms/",
        "saldo": "5000.00",
        "aplicacion_token": "abcd1234ab1234abcd1234ab1234abcd1234a",
        "descripcion": "La descripción de tu aplicacion",
        "nombre": "Tu aplicacion",
        "fecha_creacion": "2016-05-04"
      }
    ]
  }
}
```

### Historial `historial(config, callback)`

Consulta el historial de mensajes enviados o recibidos a un teléfono y retorna una respuesta con el resultado de la operación.

#### argumentos

`config` Define la configuración del historial a consultar. Debe ser un *string* con un número telefónico o un *object* con los siguientes parámetros:

* **telefono** _requerido_ Número telefónico del cual se requiere solicitar el historial.

* **tipo** _opcional_ Define el historial que se desea solicitar. Puede ser `enviados` o `recibidos`. De no definir este parámetro, por defecto se retorna el historial de SMS `enviados`

* **pagina** _opcional_ Define la página del historial que se desea solicitar; si el historial es muy extenso, está paginado, por lo tanto es buena prática solicitar sólo lo que se necesita. De no definir este parámetro, por defecto se retorna la pagina 1 del historial.

`callback` Función que será llamada una vez procesada la consulta. La misma retorna dos argumentos: _error_ y _respuesta_.

#### ejemplo

Ejemplo.js
```js
// ...

sms.historial('04141234567', function(error, respuesta) {
    if (error) {
      return console.log(error);
    }
    
    console.log(respuesta);
});
```

El resultado será:
```json
{
  "codigo": "CONSULTA_PROCESADA",
  "data": [
    {
      "paginacion": { 
        "total_sms": 500,
        "pagina_actual": 1,
        "total_paginas": 50
      }
    },
    {
      "mensajes": [
        {
          "mensaje": "Probando la librería.",
          "fecha": "2016-05-01 10:13:48.948789",
          "telefono": 04141234567,
          "id_mensaje": 44362
        },
        {
          "mensaje": "Probando la librería, otra vez.",
          "fecha": "2016-05-01 11:09:32.541603",
          "telefono": 04141234567,
          "id_mensaje": 44363
        },
        {
          más_mensajes...
        }
      ]
    }
  ]
}
```

# referencias

* [Textveloper](http://textveloper.com/)

# licencia

Licencia [MIT](http://opensource.org/licenses/MIT) :copyright: 2016 Jobsamuel Núñez