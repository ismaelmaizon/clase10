
const socket = io();

const input = document.getElementById('texto')
const texto = document.getElementById('texto');


input.addEventListener('keyup', (evt) => {
    if (evt.key === 'Enter') {
        socket.emit('message', input.value)
        input.value == ''
    }
})

socket.on('imprimir', (data) => {
    let mensajes = '';
    data.forEach(msj => {
        mensajes += ` ${msj.socketId} escribio ${msj.message} <br/>`
    });
    texto.innerHTML = mensajes
})

/*

io hace referencia a "socket.io", se le llama así por convencion.
La linea 1 permite instanciar el socket y guardarlo en la contate socket.
Dicho socket es el que utilizaremos para poder comincarnos con el socket del servidor.
(Recordar que en este punto somos clientes, porque representamos una vista)

*/



