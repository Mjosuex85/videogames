import React from 'react'
import { Link } from 'react-router-dom'


export default function PokemonCard({name, img, genre, id, rating}) {
  
  return (
    <div>
        <h4>{name}</h4>
        <Link to={`/videogames/${id}`}> 
          <img src={img} alt="NOT FOUND" width="490" height="290"/> 
        </Link>

        <div>
          {genre?.map(genre => <li>{genre}</li>)}
        </div>

        <h4>{rating}</h4>
    </div>
  )
}