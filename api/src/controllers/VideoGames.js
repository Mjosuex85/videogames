const axios = require('axios')                        // en los controllers solo vamos a usar AXIOS para las peticiones a la API
const { Videogame, Genere } = require('../db.js')    // y las bases de datos para poder manipularlas
const { Op } = require('sequelize')
const { API_KEY } = process.env

var urlGames = `https://api.rawg.io/api/games?key=${API_KEY}`

const gamesUrl = async (url) => {   // ASYNC AWAIT
    return axios.get(url) 
        .then(response => {
           let data = response.data.results 
            return data?.map(v => {
                return {
                        name: v.name,
                        id: v.id,
                        released: v.released,
                        rating: v.rating,
                        plataforms: v.platforms?.map(p => p.platform.name),
                        img: v.background_image,
                        genre: v.genres.map(g => g.name),
                        screenShots: v.short_screenshots.map(s => s.image)
                }
            }) 
        })
}

const apiGames = async () => {  // ASYNC AWAIT 
    let arrGames = []
    let allG = []

    let data = await axios.get(urlGames)
    for (let i = 1; i < 6; i++) {
        arrGames.push(data.data.next.replace("=2", `=${i}`))
    }

    for (var i = 0; i < arrGames.length; i++ ) {
        const games = await gamesUrl(arrGames[i])
        allG = [...allG, ...games]
    }
        return allG
};

const byName = async (name) => {
    const gamesApi = await gamesUrl(`${urlGames}&search=${name}`)
    const gamesBd = await Videogame.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        },
        include: {  
            model: Genere, through: { attributes: [] }
        } 
    })
    const gamesSearched = gamesApi.concat(gamesBd)
    const games = gamesSearched.length ? gamesSearched : {msg: "theres no game"}
    return games
    
}   


const allGames = async (name) => { // ASYNC AWAIT

    /* const condition = name
     ? {where: {name: {[Op.iLike]: `%${name}%`}}}  
     : {} */

    const gamesApi = await apiGames(name)
    const gamesDB = await Videogame.findAll({
        include: {  
            model: Genere, through: { attributes: [] }
        }
    })

    const allVideoGames = gamesApi.concat(gamesDB)
        return allVideoGames
};


const byId = async (id) => {  // ASYNC AWAIT
    return axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
    .then(resposne => {
        const data = resposne.data
        console.log(data)
        return {
            name: data.name,
            id: data.id,
            released: data.released,
            rating: data.rating,
            plataforms: data.platforms?.map(p => p.platform.name),
            img: data.background_image,
            genre: data.genres.map(g => g.name),
        }
    })
}

module.exports = {
    allGames,
    byId,
    byName
}