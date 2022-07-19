const axios = require('axios')
const { API_KEY } = process.env    

const urlGenre = `https://api.rawg.io/api/genres?key=${API_KEY}`
/// CONTROLLERS genres /// 

const genres = async () => {    // PROMESAS
    return axios.get(urlGenre)
    .then(response => {
        return x = response.data.results.map(e => e.name)
    })
}

module.exports = genres
