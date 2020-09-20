const http = require('http');
const path = require ('path');
//modulo path se encarga de unir directorios

const express = require("express");
const socketio = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

//settings
//indica al puerto que se conecta
app.set('port', process.env.PORT || 3000);

//llamamos a la funcio io  que esta en ./public/socket
require('./public/sockets')(io);

//static files, llama a la carpta public
// {app.use(express.static('public'))}
//__dirname te la ruta de donde estamos
// utilizamos path.join para que la ruta absoluta 
// nos valga tanto en linux como el win
app.use(express.static(path.join(__dirname, 'public')));

// app.listen(3000,console.log('conectado al puerto 3000')
// );
//arranca el servidor en el puerto 3000
server.listen(app.get('port'), () => {
  console.log('conectado al puerto',app.get('port'));
} );
