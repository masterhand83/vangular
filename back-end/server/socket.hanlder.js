const project = require('./controllers/project.controller')
module.exports = io =>{
    console.log('ESCUCHANDO SOCKETS')
    io.on('connection', socket =>{
        console.log('CONEXION ESTABLECIDA');
        socket.on('join-project',data=>{
            socket.join(data);
        })
        socket.on('new-message', message =>{
            
            io.to(message.room).emit('new-message',message.msg)
        })
    })
}