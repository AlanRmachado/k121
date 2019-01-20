const mongoose = require('mongoose');

const ParticipanteSchema = new mongoose.Schema({
    nome : String,
    email : String,
    amigo: String    

});

module.exports = mongoose.model('Participante', ParticipanteSchema);