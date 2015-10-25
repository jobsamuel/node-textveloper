<p align="center">
	<a href="http://textveloper.com/">
		<img alt="node-textveloper" src="http://i.imgur.com/c2hVKj8.png" width="auto">
	</a>
</p>
<p align="center">
    Librería Textveloper para Node.js
</p>
<p align="center">
    <a href="https://badge.fury.io/js/textveloper">
        <img src="https://badge.fury.io/js/textveloper.svg" alt="npm version" height="18">
    </a>
    <a href="https://www.npmjs.com/package/textveloper">
        <img alt="descargas" src="https://img.shields.io/npm/dt/textveloper.svg">
    </a>
    <a href="https://badge.fury.io/js/textveloper">
        <img alt="dependencias" src="https://david-dm.org/jobsamuel/node-textveloper.svg">
    </a>
    <a href="https://www.npmjs.com/package/textveloper">
        <img alt="licencia" src="https://img.shields.io/npm/l/textveloper.svg">
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

const sms = new Textveloper('<CUENTA-TOKEN>', '<SUBCUENTA-TOKEN>');
const config = {
	telefono: '04141234567', 
	mensaje: 'Probando el módulo textveloper.' 
};

sms.enviar(config, function(err, respuesta) {
    if (err) {
        // haz algo con el error.
    }
    // haz algo con la respuesta.
});
```

## licencia

Licencia [MIT](http://opensource.org/licenses/MIT) :copyright: 2015 Jobsamuel Núñez