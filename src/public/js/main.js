$(function () {

  const socket = io();

  //Obteniendo los elementos del DOM desde la interfact
const $messageform = $('#message-form');
const $messageBox = $('#message');
const $chat = $('#chat');

// Eventos

$messageform.submit(function (e) {
  e.preventDefault(); //es para que no refresque la pagina
  socket.emit('send message', $messageBox.val()); // envia el msg a los clientes
  $messageBox.val(''); //borra el input
});

socket.on('nuevo mensaje', function (data) {
  $chat.append(data + '<br/>');
});

})