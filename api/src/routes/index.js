const { Router } = require('express');
const videoGames = require('./videoGames.js')
const Genre = require('./Genre.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use('/videogames',  videoGames)
router.use('/', Genre )
// Configurar los routers   
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
