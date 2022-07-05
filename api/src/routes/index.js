const { Router } = require('express');
const videoGames = require('./videoGames.js')
const Genere = require('./genere.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use('/videogames',  videoGames)
router.use('/', Genere )
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
