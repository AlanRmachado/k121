const Participante = require('../models/Participante');
const ObjectID = require('mongodb').ObjectID;
const services = require('../services');

module.exports = {

    async index(req, res){
        const participantes = await Participante.find({});
        return res.json(participantes);
    },
    
    async store(req, res){
       
        const participante = await Participante.create(req.body);
        return res.json(Participante);
    },

    async delete(req, res){
              
        let id = req.body['id'];
        
        await Participante.remove({"_id": ObjectID(id)});
        return res.status(200).json({});

    },

    async update(req, res){
      
        const {_id, nome, email, amigo} = req.body;
        
        const participante = await Participante.findById(_id);

        participante.set({
            nome : nome,
            email : email,
            amigo : amigo
        })

        await participante.save();

        return res.status(200).json({});
    },

    async sorteio(req, res){
        let arr = req.body;        
        
        for(let i = 0 ; i < arr.length; i++){
            const {nome, amigo, _id} = arr[i];
            const participante = await Participante.findById(_id);
            
            participante.set({
                amigo : amigo
            });

            await participante.save();   
        } 
       
        let chamadas = 1;
        // Tratamento para não enviar varios e-mails por segundo.
        function envia(email, nome, amigo){
            chamadas ++;
            setTimeout(() => {
                services.sendEmail(email, nome, amigo);
                
            }, chamadas * 3000); 
        }

        arr.forEach(element => {            
            envia(element.email, element.nome, element.amigo);   
        });


        return res.status(200).json({});

    }
}