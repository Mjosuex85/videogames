const { Router } = require('express')
const router = Router()
const { Videogame } = require('../db')
const { allGames } = require('../controllers/VideoGames.js')


router.get('/videogames', async (req, res) => {
    const { name } = req.query
    res.json(allGames(name))
});

module.exports = router