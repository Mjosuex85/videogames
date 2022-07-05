const { Router } = require('express')
const router = Router()
const { Genere } = require('../db')
const genres = require('../controllers/Genere')


router.get('/genres', async (req, res) => {
    const allGenres = await genres()    
    try {
        await allGenres.map(genres => Genere.findOrCreate({
        where: {
            name: genres,
        }
    }) )

    const genres = await Genere.findAll()
    return res.status(200).send(genres)
}
    catch(error) {
        console.log(error)
        res.send(error)
}
});

module.exports = router
