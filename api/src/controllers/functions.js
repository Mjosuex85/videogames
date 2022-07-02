const axios = require('axios')
const { API_KEY } = process.env
const urlGames = `https://api.rawg.io/api/games?key=${API_KEY}`

const all = async (name) => {
    var urlSearch = ""
    name ? urlSearch = `&search=${name}` : null

    let arrGames = []
    let data = await axios.get(urlGames)
    for (let i = 1; i < 6; i++) {
        arrGames.push(data.data.next.replace("=2", `=${i}${urlSearch}`))
    }
    /* console.log(arrGames) */
    arrGames.map((g) => {
        return gamesUrl(g)
    })
};

const gamesUrl = async (url) => {
    let urls = await axios.get(url) 
        let data = urls.data.results
        let videog = data.map(v => {
            return {
                name: v.name,
                /* id: v.id,
                released: v.released,
                rating: v.rating,
                plataforms: v.platforms?.map(p => p.platform.name),
                img: v.background_image,
                genre: v.genres.map(g => g.name),
                screenShots: v.short_screenshots.map(s => s.image) */
            }

        })
        console.log(" coñoooo", videog)
        return videog
}

const byName = async (url) => {
    console.log("Hola")
};
 
const byId = async (id) => {
    
};


module.exports = {
    byName,
    all,
    byId,
    gamesUrl
};