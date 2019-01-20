const express = require('express');

const routes = express.Router();

const participantesController  =require('./controllers/ParticipantesController');


routes.get('/participantes', participantesController.index);
routes.post('/participantes', participantesController.store);
routes.delete('/participantes', participantesController.delete);
routes.put('/participantes', participantesController.update);
routes.put('/sorteio', participantesController.sorteio);


module.exports = routes;