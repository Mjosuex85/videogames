const { Router } = require('express')
const router = Router()
const { Genre } = require('../db')
const genres = require('../controllers/Genre.js')


router.get('/genre', async (req, res) => {
    const allGenres = await genres() 
     
    try {
        await allGenres.map(genre => Genre.findOrCreate({
        where: {
            name: genre,
        }
    }) )

    const xgenre = await Genre.findAll()
    return res.status(200).send(xgenre)
}
    catch(error) {
        console.log(error)
        res.send(error)
}
});

module.exports = router
