


export const validate = (input) => {
    let error = {}
    console.log(input)
    if (!input.name) {
        error.name = "Name is required"
    }

    else if (input.name) {
        error.name = "the game is alredy Created"
    }

    else if (input.name.length > 30) {
        error.name = "text length is not allowed"
    }

    if (!input.img) {
        error.img = "Image is required"
    }

    else if (input.img.length  > 200) {
        error.img = "text length is not allowed"
    }

    else if (!/(.jpg|.jpeg|.gif|.png|.bmp|.tiff|.tga|.svg)/.test(input.img)) {
        error.img = "The url format is not allowed"
    }

    if (!input.released) {
        error.released = "You need a date"
    }

    if (!input.platforms) {
        error.platforms = "You need at least one Plataforms"
    }

    if (!input.genres) {
        error.genres = "You need at least one Genre"
    }

    if (!input.description) {
        error.description = "Required"
    }

    else if (input.description.length > 200) {
        error.description = "text length is not allowed"
    }


    return error
}