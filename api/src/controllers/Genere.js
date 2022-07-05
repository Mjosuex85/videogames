const axios = require('axios')
const { videoGame, genere } = require('../db.js')
const { API_KEY } = process.env    

const urlGeneres = `https://api.rawg.io/api/genres?key=${API_KEY}`
/// CONTROLLERS genres /// 


const genres = async () => {    // PROMESAS
    return axios.get(urlGeneres)
    .then(response => {
        return x = response.data.results.map(e => e.name)
    })
}

module.exports = genres
