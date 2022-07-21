


export const validate = (input) => {
    let error = {}


    console.log("el objeto a validar ", input)

    if (!input.name) {
        error.name = "Name is required"
    }

    else if (input.name.length > 30) {
        error.name = "text length is not allowed"
    }

    /* if (input.plataforms.length === 0) {
        error.plataforms = "You must a least one plataforms"
    }

    else if (input.plataforms.length > 3) {
        error.plataforms = "Just 3 plataforms is allowed"
    } */


    console.log(error)

    return error
}