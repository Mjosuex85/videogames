import { useSelector, useDispatch } from 'react-redux'
import { useEffect, React } from 'react'
import { byId } from '../../store/actions'
import { Link } from 'react-router-dom'
import style from './details.module.css'

export default function Details({ id }) {
  const gameDetails = useSelector((state) => state.gameDetails)
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(byId(id))
  }, [dispatch, id])

  function back() {
    window.history.back() 
  }

  return (
    <div className={style.container}>
      
      <Link to={'/home'}> <button onClick={back} className={style.btn}> Home </button> </Link>
      
      <div >
        
        <div className={style.name_details}>
          <h1>{gameDetails.name}</h1>
        </div>

        <img src={gameDetails.img} alt="" width="600" height="400" />
          
          <p> ID: {gameDetails.id}</p>
          <div>
            <p className={style.rating}> Rating:{gameDetails.rating}</p>
            <p>Released {gameDetails.released}</p>
        </div>
      </div>

      <div className={style.info}>
          <p>{gameDetails.description/* .replace("<p>", "").replace("</p>", "") */}</p>
          
          <div className={style.plataforms}>
                {gameDetails.plataforms?.map(p => {
            
                  return <ul> <li>{p}</li></ul>
                })}
          </div>

          <div > 
          {gameDetails.genres?.map(p => {
            return (
              p.name
                ? <ul> <li className={style.genres}>{p.name}</li></ul>
                : <ul> <li className={style.genres}>{p}</li></ul>
            )
          })}
          </div>
      </div>

    </div>
  )
}

