// ESTA ES LA PARTE DEL SERVIDOR
//ahora quedate escuchando cuando haya otra conexion
module.exports = function(io) { 

  //  let nicknames = [
  //    'manu',
  //    'renee',
  //    'coco'
  //  ]; 

  let users = {};

  io.on('connection', socket => {
    console.log('new usuario conectado');


    socket.on('new user', (data, cb)=> {
      console.log(data);
      // if (nicknames.indexOf(data) != -1 ) {
        if (data in users) {
        cb(false);
      } else {
        cb(true);
        socket.nickname = data;
        users[socket.nickname] = socket;
        // nicknames.push(socket.nickname);
        // io.sockets.emit('usernames', nicknames);
        updateNicknames();
       
      }
    });

    //analizamos el texto y luego lo mandamos a quien corresponda o al chat general

    socket.on('send message', (data, cb) => {
      
      //quitamos los espacios de mas en el stream
      var msg = data.trim();
            //si los 4 primero caracteres coninciden con '/W ""
      if(msg.substr(0, 3)=== '/W ') {
        //cogemos el texto apartir de la tercera posicion
        msg = msg.substr(3);
        console.log(msg);
        //nos da la posicion del espacio en blanco del mensaje
        const index = msg.indexOf(' ');
        console.log(index);
        // si el resultado es distinto -1 hay un especio
        if (index !== -1 ) {
          //guardamos desde la posicion  hasta la posicion del espacio
          //y asi nos quedamos con el nombre
          var name = msg.substr(0, index);
          console.log('nombre:', name);
          //guardamos desde la posicion del espacio hasta el final
          //y asi guardamos el mensaje
          var msg = msg.substr(index + 1);
          console.log('mensage', msg);
          if (name in users) {
            users[name].emit('whisper', {
             msg,
             nick: socket.nickname
            });
          } else {
            cb('Error please enter a valid User');
          } 
         
        } else {
          cb('Error please enter your message')
        }

      } else{
        io.sockets.emit('new message', {
          msg: data,
          nick: socket.nickname
        });
      }
      
    });


    //CUANDO UN USUARIO SALE DE SESION LO BORRA DE PANTALLA
    socket.on('disconnect', data => {
      if(!socket.nickname) return;
      console.log( 'desconexion de :', nicknames.splice(nicknames.indexOf(socket.nickname) ,1));
      // nicknames.splice(nicknames.indexOf(socket.nickname) ,1);
      delete users[socket.nickname];
      updateNicknames();
    });

// Elimina usiarop del objeto
    function updateNicknames() {
      io.sockets.emit('usernames', Object.keys(users));
    }
  });
}
