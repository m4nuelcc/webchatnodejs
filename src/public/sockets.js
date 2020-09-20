
//ahora quedate escuchando cuando halla otra conexion

module.exports = function(io) { 

  io.on('connection', socket => {
    console.log('new usuario conectadoooooooooooooo');

    socket.on('send message', function(data){
      io.sockets.emit('nuevo mensaje', data);
    });

  });
}
