import { REQUEST_ALLGAMES,
         REQUEST_GENRES,
         REQUEST_GAME_BY_NAME,
         REQUEST_GAME_BY_ID,
         DATABASE,
         BY_RATING,
         ALL,
         GENRES,
         ASC,
         DESC,
         RESET,
} from './actions'

let initialState = {
    allvideoGames: [],
    allVideoGamesCopy: [],
    genres: [],
    gameDetails: []
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case REQUEST_ALLGAMES: 
            return {
                ...state,
                allvideoGames: action.payload.data,
                allVideoGamesCopy: action.payload.data
            };

        case REQUEST_GENRES: 
            return {
                ...state,
                genres: action.payload.data
            };

        case REQUEST_GAME_BY_NAME:
            return {
                ...state,
                allvideoGames: action.payload.data
            }

        case DATABASE: 
            const BydataBase = state.allvideoGames
            const dataBase = BydataBase.filter(g => g.hasOwnProperty("createdInDb"))
            return {
                ...state,
                allvideoGames: dataBase
            };

        case ALL:
            const all = state.allVideoGamesCopy
            return {
                ...state,
                allvideoGames: all
            }
            
        case BY_RATING: 
            let rating;
            const byRating = state.allvideoGames
            action.payload === 'highest'
            ? rating = byRating.sort((a, b) => b.rating - a.rating)
            : rating = byRating.sort((a, b) => a.rating - b.rating)
            return {
                ...state,
                allvideoGames: [...rating]
            };

        case GENRES: 
            const genresPayload = state.allVideoGamesCopy
            let x = genresPayload.filter(e => e.genre).filter(x => x.genre.includes(action.payload))
            return {
                ...state,
                allvideoGames: [...x]
            };

        case ASC:
            function asc(a, b) {
                if ( a.name < b.name ) { return -1; }
                if ( a.name > b.name ) { return 1; }
                return 0;
            }
            let gamesAsc = state.allvideoGames.sort(asc)

        return {
                ...state,
                allvideoGames: [...gamesAsc]
        };

        case DESC:
            function desc(a, b) {
                if ( a.name > b.name ) { return -1; }
                if ( a.name < b.name ) { return 1; }
                return 0;
            }
            let gamesDesc = state.allvideoGames.sort(desc)

        return {
                ...state,
                allvideoGames: [...gamesDesc]
        };
        
        case RESET:
            return {
                ...state,
                allvideoGames: [...state.allVideoGamesCopy]
        };

        default: {
            return state;
        }
    }
}