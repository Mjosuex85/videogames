const axios = require('axios')                       // en los controllers solo vamos a usar AXIOS para las peticiones a la API
const { VideoGame, Genere } = require('../db.js')    // y las bases de datos para poder manipularlas
const { API_KEY } = process.env
const { byName, all} = require('./functions')

var urlGames = `https://api.rawg.io/api/games?key=${API_KEY}`

/// CONTROLLERS VIDEO GAMES ///

const allGames = async (name) => {
    all(name)
};

const gamesByname = async (name) => {
};

const gamesByid = async (id) => {
};


module.exports = {
    allGames
}