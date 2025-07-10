'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const fccTesting = require('./freeCodeCamp/fcctesting.js');
const app = express();
const bcrypt = require('bcrypt'); // BCrypt es requerido aquí

// Configuración para servir archivos estáticos desde la carpeta 'public'
// Esto es para CSS, JS del lado del cliente, imágenes, etc.
app.use('/public', express.static(process.cwd() + '/public'));

// Middleware para parsear cuerpos de solicitud JSON y URL-encoded
// Es necesario para manejar datos enviados desde formularios HTML
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ====================================================================
// RUTAS ESPECÍFICAS PARA LOS DESAFÍOS DE FREECODECAMP
// ====================================================================

// Ruta para que freeCodeCamp pueda verificar el package.json
// Esto es crucial para que pasen los primeros tests de BCrypt
app.get('/_api/package.json', function(req, res) {
  res.sendFile(__dirname + '/package.json');
});

// Ruta principal para servir el archivo index.html
// Esta es la página que se mostrará cuando accedas a la URL de Render
app.route('/').get((req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// ====================================================================
// FIN DE RUTAS ESPECÍFICAS PARA LOS DESAFÍOS
// ====================================================================

// Inicialización del framework de testing de freeCodeCamp
// No modificar esta línea
fccTesting(app);

// Configuración del puerto donde el servidor escuchará
// Utiliza el puerto proporcionado por el entorno (Render) si está disponible,
// de lo contrario, usa el puerto 3000 para desarrollo local.
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on port: ' + port);
});

// ====================================================================
// CÓDIGO PARA FUTUROS DESAFÍOS DE BCRYPT (actualmente comentado)
// ====================================================================

/*
// Ejemplo de cómo usar bcrypt para hashear una contraseña
// Esto se usará en desafíos posteriores
const saltRounds = 12; // Costo de computación, 12 es un buen equilibrio
const myPlaintextPassword = 'superpassword!';

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
  if (err) {
    console.error('Error al generar hash:', err);
    return;
  }
  console.log('Hash generado:', hash);
  // Aquí podrías guardar el hash en una base de datos
});

// Ejemplo de cómo verificar una contraseña
// Esto también se usará en desafíos posteriores
const someOtherPlaintextPassword = 'pass123';
const storedHash = '$2a$12$YOUR_ACTUAL_HASH_FROM_DB_HERE'; // Reemplaza con un hash real

bcrypt.compare(someOtherPlaintextPassword, storedHash, function(err, result) {
  if (err) {
    console.error('Error al comparar hash:', err);
    return;
  }
  if (result) {
    console.log('Contraseña correcta');
  } else {
    console.log('Contraseña incorrecta');
  }
});
*/
