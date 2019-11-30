// import server configuration
var app = require('./config/server');

// parameterize listen port and assigning it to variable server
var server = app.listen(80, function(){
    console.log('Server online')
})

// create the variable io
var io = require('socket.io').listen(server);;

app.set('io', io);

// create the connection by websocket
io.on('connection',function(socket){
    console.log('Usuário conectou');

    socket.on('disconnect',function(){
        console.log('Usuário desconectou');
    })
    
    socket.on('msgParaServidor', function(data){
        if(data.logout){
            socket.broadcast.emit('logoutParticipanteParaCliente',{ apelido: data.apelido });
            socket.broadcast.emit('msgParaCliente', { apelido: '<font color="red">' + data.apelido + '</font>', mensagem: '<font color="red">Acabou de sair do chat</font>' });
        }
        else{
            // dialog
            socket.emit('msgParaCliente',{ apelido: data.apelido, mensagem: data.mensagem });
    
            socket.broadcast.emit('msgParaCliente',{ apelido: data.apelido, mensagem: data.mensagem });            
        }
    })
})