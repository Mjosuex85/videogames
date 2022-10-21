import React from 'react'
import { Link } from 'react-router-dom'
import style from './card.module.css'
import Pagination from '../Pagination/Pagination'


export default function GameCard({name, img, genres, id, rating}) {
  
  return (
    <>
    <Link className={style.lik} to={`/details/${id}`}>  
    <div className={style.container}>
        <h4 className={style.title}> {name}</h4>
        
          <img className={style.img} src={img} 
              alt="Not Found" 
              width="320" 
              height="190"/> 

      <div className={style.info}>
        <div>
              {genres?.map(genre => {
               return (genre.name 
                  ? <p>{genre.name}</p>
                   : <p>{genre}</p>)
              }
             )}
        </div>
        <div className={style.rating}>
              <h2 >{rating}</h2>
        </div>
        

      </div>

      
    </div>
    </Link>
</>

)
}