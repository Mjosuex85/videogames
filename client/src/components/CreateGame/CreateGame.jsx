import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ratings, plataforms } from './plataforms'
import { GetGenres } from '../../store/actions'

export const validate = (input) => {
  let error = {}

  console.log(error.name)
  if (!input.name) {
      error.name = "Name is required"
  }

  else if (!input.rating) {
      error.rating = "Please you need to rate this game"
  }

  /* if (input.plataforms.length === 0) {
      error.plataforms = "you need at least one plataforms"
  } */

  return error
}

export default function CreateGame() {
  const genresState = useSelector((state) => state.genres)
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(GetGenres())
  }, [dispatch])
 
  ////////////////////////////////////////////////////////////////////////// ESTADOS ///////////////////////////////////////////////////////

  const [ error, setError] = useState({})
  const [ game, setGame ] = useState({})
  const [ genreForm, setGenre ] = useState([])
  const [ plataformsFrom , setPlataformsFrom] = useState([])
  const [ img , setImg ] = useState({img: "https://admin.esment.org/uploads/flat_pages/no.gif"})

  /////////////////////////////////////////////////////////////////// FUNCIONES MANEJADORAS DE ESTADOS ////////////////////////////////////

    const handleOnChange = (e) => {
        e.preventDefault()
        setGame({
          ...game,
          [e.target.name]: e.target.value,
          genres: genreForm,
          plataforms: plataformsFrom
        })
    
        setError(validate({
          ...game,
          [e.target.name]: e.target.value
        }))
        console.log(error)
        
        if (e.target.name === "img") {
          setImg({...img, img: e.target.value})
        }
    }
      
      function onInputChange2(e) {
        e.preventDefault()
        setGenre([
          ...genreForm,
          e.target.value
        ])
      }

      function onInputChange3(e) {
        e.preventDefault()
        setPlataformsFrom([
          ...plataformsFrom,
          e.target.value
        ])
      }
      
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:3856/videogames/`, game)
        .then((res) => {
          alert(res.data.name.toUpperCase() + " the Game was succesfully added")
        })
    }

////////////////////////////////////////////////////////////////// FORMULARIO ////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
        <Link to='/home'><button>Go Back</button></Link>
                <h1> Create your VideoGame</h1>
        <form onSubmit={handleSubmit}>
            
          <div>
              <label htmlFor=''>Name </label>
                <input onChange={handleOnChange} 
                  name='name' 
                  type="text" 
                  value={game.name} /> 
                {error.name ? <p>{error.name}</p> : ""} <br></br>
          </div>    
            
          <div>
              <label htmlFor=''>Released </label>
                <input onChange={handleOnChange} 
                  name='released' 
                  type="date" 
                  value={game.released} /> <br></br>
          </div>
            
          <div>
                <label htmlFor=''>Plataforms </label>
                    <select  onChange={onInputChange3} name="plataforms" value={plataformsFrom}> 
                         { plataforms?.map(p => {
                            return <option>{p}</option>         
                        })}
                    </select>  <br></br> 
                    <p>{error.plataforms ? error.plataforms : ""}</p>
          </div> 

          <div>
              {plataformsFrom?.map(g => {
                return <ul> <li>{g}</li></ul>
              })}
          </div>

          <div>    
            <label htmlFor=''> Genres </label>
                <select onChange={onInputChange2} name="plataforms" value={genreForm} > 
                   {genresState?.map(t => {
                      return <option value={t.name}>{t.name}</option>
                  })}
               
                </select> <br></br>
          </div>
               <div>
                    {genreForm?.map(g => {
                      return <ul> <li>{g}</li></ul>
                    })}
                </div>
          <div>
                <label htmlFor=''>Rating </label>
                    <select onChange={handleOnChange} name="rating" value={game.rating}> 
                          {ratings?.map(r => {
                              return <option>{r}</option>
                          }) }
                    </select> 
                    <p>{error.rating ? error.rating : ""}</p> <br></br>
          </div>

          <div>
               <label htmlFor=''>Image </label>
                  <input 
                    onChange={handleOnChange} 
                    name='img' 
                    type="text" 
                    value={game.img}/> <br></br> 
                <img src={img.img}  width="200" height="150"/> <br /><br />
                {error.img ? <p>{error.img}</p> : ""} <br></br>
          </div>

          <div>
             <label htmlFor=''>ScreenShots</label>
                <input 
                  onChange={handleOnChange} 
                  name='screenshots' 
                  type="text" 
                  value={game.screenshots} /> <br></br>
          </div>

          <div>  
             <label htmlFor=''>Description</label>
                <textarea
                  onChange={handleOnChange} 
                  name='description'
                  type="text" 
                  rows="3" 
                  cols="40" 
                  value={game.description} /> <br></br>
          </div>



        </form>
            
            <button onClick={handleSubmit}  disabled={Object.keys(error).length > 1}> Create </button>
          
    </div>
  )
}