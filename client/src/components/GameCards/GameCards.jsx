import React, { useState } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react'
import  { allGames } from '../../store/actions.js'
import GameCard from '../GameCard/GameCard.jsx'
import style from './cards.module.css'
import Loading from '../Loading/Loading.jsx'

export default function GameCards() {
    let games = useSelector((state) => state.allvideoGames)
    let dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(allGames())
    }, [])  


    // variable que se edita para elegir la cantidad de juegos a mostrar por
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


    if (games.length > 0) {
        return (
    <>
        <div className={style.container}>
            {  games.slice(start, finish).map(g => {
                return <GameCard 
                name={g.name} 
                img={g.img} 
                genres={g.genres}
                id={g.id}
                rating={g.rating}
                />
            })}

          <div> 
                <button 
                      disabled={ start === 0 ? true : false } 
                      onClick={goToPreviousPage}> Prev 
                </button> 
              
                <button 
                      disabled={ finish > games.length || games.length < 16 ? true : false} 
                      onClick={goToNextPage}> Next
                </button>
          </div>
        </div> 
        </>
  )}


          else {
              return (
                <>
                      <h1 className={style.loading}> <Loading/></h1>
                </>
              )
}}
