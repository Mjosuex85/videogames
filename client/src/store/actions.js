import axios from "axios";
export const REQUEST_ALLGAMES = "REQUEST_ALLGAMES"
export const REQUEST_GAME_BY_NAME = "REQUEST_GAME_BY_NAME"
export const REQUEST_GENRES = "REQUEST_GENRES"
export const DATABASE = 'DATABASE'
export const BY_RATING = 'BY_RATING'
export const ALL = 'ALL'
export const GENRES = "GENRES"
export const ASC = "ASC"
export const DESC = 'DESC'
export const RESET = "RESET"
export const REQUEST_GAME_BY_ID = "REQUEST_GAME_BY_ID"

export function allGames() {    //   API QUERY
    return async function(dispatch) {
        try { return axios.get("http://localhost:3856/videogames")
               .then((game) => {
                return dispatch({
                    type: REQUEST_ALLGAMES,
                    payload: game
                })
    })
    }
        catch(error) {
         console.log(error)
        }
}
};

export function GetGenres () {  // API QUERY
    return function(dispatch) {
        try {
            return axios.get("http://localhost:3856/genre")
            .then((genres) => {
                return dispatch({
                    type: REQUEST_GENRES,
                    payload: genres
                })
            })
        }
        catch(error) {
            console.log(error)
        }
    }
}

export function byName(name) {
    return function(dispatch) {
        try {
            return axios.get(`http://localhost:3856/videogames?name=${name}`)
            .then((gamesName) => {
                return dispatch({
                    type: REQUEST_GAME_BY_NAME,
                    payload: gamesName
                })
            })
        }
        catch(error) {}
    }
}

export function byId(id) {
    return function(dispatch) {
        try {
            return axios.get(`http://localhost:3856/videogames/${id}`)
            .then(details => {
                return dispatch({
                    type: REQUEST_GAME_BY_ID,
                    payload: details
                })
            })
        }
        catch(error) {
            console.log(error)
        }
    }
}


export function byGenres(payload) {
    return { type: GENRES, payload }
}

export function byDataBase(payload) {
    return { type: DATABASE, payload}
}

export function byRating(payload) {
    return {type: BY_RATING, payload}
}

export function all(payload) {
    return {type: ALL, payload}
}

export function asc(payload) {
    return {type: ASC, payload}
}

export function desc(payload) {
    return {type: DESC, payload}
}

export function resetFilter(payload) {
    return {type: RESET, payload}
}


