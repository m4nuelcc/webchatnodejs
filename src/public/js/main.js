//ESTA ES LA PARTE DEL CLIENTE
$(function () {

  const socket = io();

//Obteniendo los elementos del DOM desde la interfact
const $messageform = $('#message-form');
const $messageBox = $('#message');
const $chat = $('#chat');

// Obteniendo Elementos del nicknameForm
const $nickForm = $('#nickForm');
const $nickError = $('#nickError');
const $nickname = $('#nickname');

const $users = $('#usernames');

$nickForm.submit(e => {
  e.preventDefault();
  socket.emit('new user', $nickname.val(), data => {
    if (data){
      $('#nickWrap').hide();
      $('#contentWrap').show();
    } else {
      $nickError.html(`
        <div class="alert alert-danger">
          that username already exits.
        </div>
      `)
    }
    $nickname.val('');
  })
});
// Eventos
$messageform.submit(function (e) {
  e.preventDefault(); //es para que no refresque la pagina
  socket.emit('send message', $messageBox.val()); // envia el msg a los clientes
  $messageBox.val(''); //borra el input
});

socket.on('nuevo mensaje', function (data) {
  $chat.append('<b>' + data.nick + '</b>: ' + data.msg  + '<br/>' );
});
// Recorre el array para mostar los usuarios en pantalla 
socket.on('usernames', data => {
  let html = '';
  for (let i = 0; i < data.length; i++) {
    html += `<p><i class="fas fa-user"></i>${data[i]}</P>`
  }
  $users.html(html);

});

})