import { useSelector, useDispatch} from 'react-redux'
import { useEffect, React} from 'react'
import { byId } from '../../store/actions'
import { Link } from 'react-router-dom'

export default function Details({id}) {
  const gameDetails = useSelector((state) => state.gameDetails)
  console.log(" este es el id de details",id)
  let dispatch = useDispatch()
    useEffect(() => {
        dispatch(byId(id))  
    }, [dispatch, id])
    
  return (
    <div>
        <Link to={'/home'}> <button>Home</button></Link>
        <div>
          <p> ID: {gameDetails.id}</p>  
          <h1>{gameDetails.name}</h1>
          <img src={gameDetails.img} alt="" width="600" height="400" />
          <p>{gameDetails.rating}</p>
          
          
          <p>Released {gameDetails.released}</p>
          
          <p>{gameDetails.description/* .replace("<p>", "").replace("</p>", "") */}</p>
          <div>
              {gameDetails.plataforms?.map(p => {
                   return <ul> <li>{p}</li></ul>
                })}
          </div>

          <div>
              {gameDetails.genres?.map(p => {
                 return (
                  p.name
                  ? <ul> <li>{p.name}</li></ul>
                  : <ul> <li>{p}</li></ul>
                 )
              })}
          </div>
        </div>    
    </div>
  )
}

