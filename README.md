<p align="center">
	<a href="http://textveloper.com/">
		<img alt="node-textveloper" src="http://i.imgur.com/c2hVKj8.png" width="auto">
	</a>
</p>
<p align="center">
    Librería Textveloper para Node.js
</p>
<p align="center">
    <a href="https://www.npmjs.com/package/textveloper">
        <img src="https://img.shields.io/npm/v/textveloper.svg?style=flat-square" alt="npm version">
    </a>
    <a href="https://www.npmjs.com/package/textveloper">
        <img alt="descargas" src="https://img.shields.io/npm/dt/textveloper.svg?style=flat-square">
    </a>
    <a href="https://www.npmjs.com/package/textveloper">
        <img alt="dependencias" src="https://david-dm.org/jobsamuel/node-textveloper.svg?style=flat-square">
    </a>
    <a href="https://www.npmjs.com/package/textveloper">
        <img alt="licencia" src="https://img.shields.io/npm/l/textveloper.svg?style=flat-square">
    </a>
</p>

----

## instalación

```bash
$ npm install textveloper
```

## ejemplo

```js
import Textveloper from 'textveloper';

const sms = new Textveloper({
  cuenta_token: '<CUENTA-TOKEN>',
  aplicacion_token: '<APLICACION-TOKEN>'
});

sms.enviar({
  telefono: '04141234567', 
  mensaje: 'Probando la librería Textveloper.' 
}, function(error, respuesta) {
  if (error) {
    // hacer algo con el error.
  }

  // hacer algo con la respuesta.
});
```

## documentación

* [Documentación de la librería Textveloper](DOCUMENTACION.md)

## licencia

Licencia [MIT](http://opensource.org/licenses/MIT) :copyright: 2017 Jobsamuel Núñez