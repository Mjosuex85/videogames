const { Router } = require('express')
const router = Router()
const { allGames, byId } = require('../controllers/VideoGames.js')
const { Videogame } = require('../db.js')
const createGame = require('../controllers/CreateGame')


router.get('/', async (req, res) => {
    const { name } = req.query 
    
    try { const videoG = await allGames(name) 
        res.send(videoG)
    }

    catch(error) {
        console.log(error)
        res.send("el juego no existe")
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {const gameId = await byId(id)
        res.send(gameId)
    }
    
    catch(error) {
        console.log(error)
        res.status(404).send("Game not found")
    }
})

router.post('/', async (req, res) => {
    const obj = req.body
    try { 
        const newGame = await Videogame.create(createGame(obj))
        res.status(200).send(newGame)
    }
    catch(error) {
        console.log(error)
        res.send(400).send(error)
    }
})

module.exports = router