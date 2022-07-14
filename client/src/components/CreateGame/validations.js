import axios from "axios"

export const validate = (input) => {
    let error = {}

    // input recibe el clave valor.. {game, name: "valor" }

    if (input.name === "") {
        error.name = "Name is required"
    }

    if (input.rating === "Choose your rating") {
        error.rating = "Please you need to rate this game"
    }

    return error
}

// error es un objeto que tiene   error = obj {name: "Name is required" }