const createGame = (obj) => {
    const newGame = {
        name: obj.name,
        description: obj.description,
        released: obj.released,
        rating: obj.rating,
        plataforms: obj.plataforms,
        image: obj.image,
        screenshots: obj.screenshots
    }
    return newGame
}

module.exports = createGame