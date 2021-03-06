const http = require('http');
const path = require ('path');
//modulo path se encarga de unir directorios

const express = require("express");
const socketio = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);


//db connection
const mongoose =require('mongoose');

mongoose.connect('mongodb://mongo/chat', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('Db is connect to',db.connection.host))
    .catch(err => console.log(err));



//settings
//indica al puerto que se conecta
app.set('port', process.env.PORT || 3000);


//llamamos a la funcion io  que esta en ./public/socket
// para arrancar el servidor
require('./sockets')(io);

//static files, llama a la carpta public
// {app.use(express.static('public'))}

//__dirname te da la ruta de donde estamos
// utilizamos path.join para que la ruta absoluta 
// nos valga tanto en linux como el win
// manda la carpeta public al navegador cada vez que un usuario entra
app.use(express.static(path.join(__dirname, 'public')));

// app.listen(3000,console.log('conectado al puerto 3000')
// );
//arranca el servidor en el puerto 3000
server.listen(app.get('port'), () => {
  console.log('conectado al puerto',app.get('port'));
} );
