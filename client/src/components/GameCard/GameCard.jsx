import React from 'react'
import { Link } from 'react-router-dom'
import style from './card.module.css'


export default function GameCard({name, img, genres, id, rating}) {
  
  return (
    <div className={style.container}>
        <h4 className={style.title}> {name}</h4>
        <Link to={`/details/${id}`}> 
          <img className={style.img} src={img} 
              alt="Not Found" 
              width="290" 
              height="190"/> 
        </Link>

        <div>
          {genres?.map(genre => {

            return (genre.name 
            ? <li>{genre.name}</li>
            : <li>{genre}</li>)
          }
          )}
        </div>
        
        <div >
        <h4 className={style.rating}>{rating}</h4>
        </div>
    </div>
  )
}