export const validate = (input) => {
    let error = {}

    // input recibe el clave valor.. {game, name: "valor" }
    console.log(input.name)
    if (!input.name) {
        
        error.name = "Name is required"
    }

   /*  if (input.rating === "Choose your rating") {
        error.rating = "Please you need to rate this game"
    } */

    /* if (input.plataforms.length === 0) {
        error.plataforms = "you need at least one plataforms"
    } */

    return error
}

// error es un objeto que tiene   error = obj {name: "Name is required" }