// ESTA ES LA PARTE DEL SERVIDOR
//ahora quedate escuchando cuando halla otra conexion
module.exports = function(io) { 

   let nicknames = [
     'many',
     'renee',
     'coco'
   ]; 

  io.on('connection', socket => {
    console.log('new usuario conectadoooooooooooooo');


    socket.on('new user', (data, cb)=> {
      console.log(data);
      if (nicknames.indexOf(data) != -1 ) {
        cb(false);
      } else {
        cb(true);
        socket.nickname = data;
        nicknames.push(socket.nickname);
        // io.sockets.emit('usernames', nicknames);
        updateNicknames();
       
      }
    });


    socket.on('send message', data => {
      io.sockets.emit('nuevo mensaje', {
        msg: data,
        nick: socket.nickname
      });
    });


    //CUANDO UN USUARIO SALE DE SESION LO BORRA DE PANTALLA
    socket.on('disconnect', data => {
      if(!socket.nickname) return;
      nicknames.splice(nicknames.indexOf(socket.nickname) ,1);
      updateNicknames();
    });

// Elimina un elemento del arry nickname
    function updateNicknames() {
      io.sockets.emit('usernames', nicknames);
    }
  });
}
