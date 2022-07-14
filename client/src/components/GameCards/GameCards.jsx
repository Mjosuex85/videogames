import React from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react'
import  { allGames } from '../../store/actions.js'
import GameCard from '../GameCard/GameCard.jsx'

export default function GameCards() {
    let games = useSelector((state) => state.allvideoGames)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(allGames())
    }, [dispatch])

    
  return (
    <div>
        {
        games?.map(g => {
            return <GameCard 
            name={g.name} 
            img={g.img} 
            genre={g.genre}
            id={g.id}
            rating={g.rating}
            />
        })
        }   
    </div>
  ) 
}
