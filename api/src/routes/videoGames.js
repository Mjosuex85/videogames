const { Router } = require('express')
const router = Router()
const { allGames, byId, byName } = require('../controllers/VideoGames.js')
const { Videogame, Genere } = require('../db.js')
const createGame = require('../controllers/CreateGame')


router.get('/', async (req, res) => {
    const { name } = req.query 
    try { 
        const videoG = name ? await byName(name) : await allGames()
        res.status(200).send(videoG)
    }
    catch(error) {
        console.log(error)
        res.send("erro")
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
    const { genres } = req.body
    
    function capFirtsLetter(str) {
        let string = str
        string[0] === " " ? string = string.slice(1) : null
        return string.charAt(0).toUpperCase() + string.toLocaleLowerCase().slice(1);
    }
      
    try { 
        const newGame = await Videogame.create(createGame(obj))
        let genre = await Genere.findAll({
            where: {name: genres}
        })
        
        newGame.name = capFirtsLetter(obj.name)
        await newGame.save()
        await newGame.addGenere(genre)
        res.status(200).send(newGame)
    }
    catch(error) {
        console.log("El juego ya se encuentra creado, crea conflicto con la base de datos", error)
        res.status(400).send("The Game alredy Exist")
    }
})

module.exports = router