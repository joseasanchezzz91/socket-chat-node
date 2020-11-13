var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('name') || !searchParams.has('chat')){
	window.location= 'index.html';
	throw new Erro ("el name/chat es necesario");
}


let user = {name: searchParams.get('name'),chat:searchParams.get('chat') };


socket.on('connect', function() {
    console.log('Conectado al servidor');

socket.emit('intoChat',user,function(resp){

	console.log('usuarios conectados ',resp);
});








});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});

// Escuchar información
socket.on('createMessage', function(mensaje) {

    console.log( mensaje);

});

socket.on('listUser', function(mensaje) {

    console.log( 'list', mensaje);

});

//mensaje privador
socket.on('messagePrivate', function(mensaje) {

    console.log( 'messagePrivate', mensaje);

});