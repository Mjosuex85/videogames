const axios = require('axios')                       // en los controllers solo vamos a usar AXIOS para las peticiones a la API
const { videoGame, genere } = require('..db.js/')    // y las bases de datos para poder manipularlas


const urlGeneres = `https://api.rawg.io/api/genres?key=${API_KEY}`
/// CONTROLLERS genres ///

const genres = async () => {
    let genres = await axios.get(urlGeneres)
    
    
}

