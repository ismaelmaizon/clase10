import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routers/views.router.js';
import { Server } from 'socket.io';
import mime from 'mime-types';



const app = express();
app.use(express.static(__dirname + ' /public',  {
    setHeaders: (res, path) => {
      if (mime.lookup(path) === 'text/javascript') {
        res.setHeader('Content-Type', 'application/javascript');
      }
    }
}));



// config de platillas
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);


const expressServer = app.listen(8080, () => console.log("connection"));

// creamos un servidor para sockets viviendo dentro de un nuevo servidor principal
const socketServer = new Server(expressServer);


//const mensajes = [];

socketServer.on("connection", (socket) => {
    console.log("connected " + socket.id);
    
    socket.on('error', (err) => console.log(err))
    
    // socket.on("message", (data) => {
    //   console.log(data)
    //   mensajes.push({ socketId: socket.id, message: data });
    //   console.log(mensajes)
    //   socketServer.emit("imprimir", mensajes);
    // });
});

// socket.on('message2', data=> {
//     console.log(data);
// })

// socket.on('error', err => console.error(err));

/*

socket.emit('evento_para_socket_individual', 'este mensaje solo lo debe recibir el socket')
socket.broadcast.emit('evento_para_todos_menos_el_socket_actual', 'este evento lo verean los socket conectasdos, MENOS el socket actual desde donde se envio el mensaje')
socketServer.emit('evento_para_todos', 'este evento lo verean todos los socket conectasdos)


*/ 