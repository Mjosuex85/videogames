import React, { useState } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react'
import  { allGames } from '../../store/actions.js'
import GameCard from '../GameCard/GameCard.jsx'
import style from './cards.module.css'
import style1 from '../Nav/nav.module.css'

export default function GameCards() {
    let games = useSelector((state) => state.allvideoGames)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(allGames())
    }, [dispatch])

  console.log(style1)
  
  return (
    <div className={style.container}>
        { games.length > 0 ? 
                games.map(g => {
            return <GameCard 
            name={g.name} 
            img={g.img} 
            genres={g.genres}
            id={g.id}
            rating={g.rating}
            />
        })
        : <h6 className={style.intro}> Loading... </h6>
        }   
    </div> 
  ) 
}
