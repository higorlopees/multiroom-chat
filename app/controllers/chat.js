module.exports.iniciaChat = function(application, req, res){
    var dadosForm = req.body;
    
    req.assert('apelido','Nome ou apelido é obrigatório').notEmpty();
    req.assert('apelido','Nome ou apelido deve conter entre 3 e 15 caracteres').len({ min: 3, max: 15 });

    var erros = req.validationErrors();

    if(erros){
        res.render('index', { validacao: erros, dadosForm: dadosForm });
        return;
    }

    var socket = application.get('io');

    socket.emit('msgParaCliente',{ apelido: '<font color="green">' + dadosForm.apelido + '</font>', mensagem: '<font color="green">Acabou de entrar no chat</font>' });
    
    socket.emit('participantesParaCliente',{ apelido: dadosForm.apelido });

    res.render('chat', { dadosForm: dadosForm });
}