import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { validate } from './validations'
import { ratings, plataforms } from './plataforms'

export default function CreateGame() {
  const genresState = useSelector((state) => state.genres)
  const [ error, setError] = useState({})
  const [ game, setGame ] = useState({})
  const [ genreForm, setgenre ] = useState([])
  const [ img , setImg ] = useState({img: "https://admin.esment.org/uploads/flat_pages/no.gif"})


    const handleOnChange = (e) => {
        e.preventDefault()
        setGame({
          ...game,
          [e.target.name]: e.target.value
        })

        
        setError(validate({game, [e.target.name]: e.target.value}))
        console.log(error)
        
        if (e.target.name === "img") {
          setImg({...img, img: e.target.value})
        }
        
    }
      
      function onInputChange2(e) {
        e.preventDefault()
        setgenre([
          ...genreForm,
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
                    <select disable="222"onChange={handleOnChange} name="plataforms" value={game.plataforms}> 
                         { plataforms.map(p => {
                            return <option>{p}</option>         
                        })}
                    </select>  <br></br> 
          </div> 

          <div>
                <label htmlFor=''>Rating </label>
                    <select onChange={handleOnChange} name="rating" value={game.rating}> 
                          {ratings.map(r => {
                              return <option>{r}</option>
                          }) }
                    </select> 
                <p>{error.rating}</p><br></br>
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
                <input 
                  onChange={handleOnChange} 
                  name='description'
                  type="text" 
                  value={game.description} /> <br></br>
          </div>

          <div>    
            <label htmlFor=''> Genres </label>
                <select onChange={onInputChange2} value={genreForm} > 
                   {genresState.map(t => {
                      return <option>{t.genre}</option>
                  })}
               
                </select> <br></br>
          </div>
            
          <div>
              {genreForm.map(t => {
                return <>
                          <ul> 
                              <li>{t}</li> 
                          </ul>
                       </>
              })}
          </div>

            <button disabled={false}> Create </button>
            
        </form>
            
          
    </div>
  )
}