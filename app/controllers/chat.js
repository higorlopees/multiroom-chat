module.exports.iniciaChat = function(application, req, res){
    var dadosForm = req.body;
    
    req.assert('apelido','Nome ou apelido é obrigatório').notEmpty();
    req.assert('apelido','Nome ou apelido deve conter entre 3 e 15 caracteres').len({ min: 3, max: 15 });

    var arrayIndex = application.settings.chatParticipants.indexOf(dadosForm.apelido);
    var erros = req.validationErrors();
    
    if(arrayIndex != -1){
        existsError = { location: 'body', param: 'apelido', msg: 'Nome ou apelido já está em uso', value: '' };
        if(erros){ erros.push(existsError); }
        else{ erros = [existsError]; }
    }

    if(erros){
        res.render('index', { validacao: erros, dadosForm: dadosForm });
        return;
    }

    application.get('io').emit('msgParaCliente',{ apelido: '<font color="green">' + dadosForm.apelido + '</font>', mensagem: '<font color="green">Acabou de entrar no chat</font>' });
    
    application.get('io').emit('participantesParaCliente',{ apelido: dadosForm.apelido });

    application.settings.chatParticipants.push(dadosForm.apelido);

    res.render('chat', { dadosForm: dadosForm, participantes: application.settings.chatParticipants });
}