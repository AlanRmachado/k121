var nodemailer = require('nodemailer');

const services = {
      sendEmail: function (email, nome, amigo) {
        

        var transporte = nodemailer.createTransport({
            service: 'mailtrap', 
            auth: {
                user: '9a04325df2ac79', 
                pass: '254e39b91ab516'  
            }
        });

        
        var email = {
            from: 'Amigo Secreto <alan@alanmachado.com.br>', 
            to: email, 
            subject: 'Sorteio Amigo Secreto',   
            html: `<p>Olá ${nome}, seu amigo sercreto é : <strong>${amigo}</strong></p>`
        };

        
        transporte.sendMail(email, function (err, info) {
            if (err)
                throw err; 

            console.log('Email enviado! Leia as informações adicionais: ', info);
        });
    }
}

module.exports = services;