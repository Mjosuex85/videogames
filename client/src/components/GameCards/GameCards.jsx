import React, { useState } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react'
import  { allGames } from '../../store/actions.js'
import GameCard from '../GameCard/GameCard.jsx'
import style from './cards.module.css'

export default function GameCards() {
    let games = useSelector((state) => state.allvideoGames)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(allGames())
    }, [dispatch])

    const gamesToShow = 15

    const [ start, setStart ] = useState(0)
    const [ finish, setFinish ] = useState(gamesToShow)

    function goToNextPage() {
        start === 0 ? setStart(gamesToShow) : setStart(start + gamesToShow)
          setFinish(finish + gamesToShow)
          console.log("Start", start)
          console.log("Finish", finish)
    }
        

    function goToPreviousPage() {
        setStart(start - gamesToShow)
        setFinish(finish - gamesToShow)
    }
       



  return (
    <div className={style.container}>
        { games.length > 0 ? 
                games.slice(start, finish).map(g => {
            return <GameCard 
            name={g.name} 
            img={g.img} 
            genres={g.genres}
            id={g.id}
            rating={g.rating}
            />
        })
        : <h6 className={style.intro}> Loading... </h6>}   

      <div> <button disabled={ start === 0 ? true : false } onClick={goToPreviousPage}> Prev </button> 
            <button disabled={ finish > games.length || games.length < 16 ? true : false} onClick={goToNextPage}>Next</button></div>
    </div> 
  ) 
}
