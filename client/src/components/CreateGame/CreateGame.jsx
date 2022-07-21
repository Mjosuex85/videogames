import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ratings, plataforms } from './plataforms'
import { GetGenres } from '../../store/actions'
import { validate } from './validations'
import style from './create.module.css'


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

      function removePlataforms(e) {
        e.preventDefault()
        let x = e.target.innerText.replace(" ❌", "")
        setPlataformsFrom([...plataformsFrom].filter(e => e !== x))
      }

      function removeGenre(e) {
        e.preventDefault()
        console.log(e.target)
        let x = e.target.innerText.replace(" ❌", "")
        setGenre([...genreForm].filter(e => e !== x))
      }

      function onInputChange3(e) {
        e.preventDefault()
        setPlataformsFrom([
          ...plataformsFrom,
          e.target.value
        ])
      }
      
    const handleSubmit =  async (e) => {
        e.preventDefault()
        let x = await axios.post(`http://localhost:3856/videogames/`, game)
        /* .then((res) => {
          
        }) */
        alert(x.data.name.toUpperCase() + " the Game was succesfully added")
        window.history.back();

    }

////////////////////////////////////////////////////////////////// FORMULARIO ////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className={style.container}>
        <Link to='/home'><button>Go Back</button></Link>
                <h1> Create your VideoGame</h1>
        <form onSubmit={handleSubmit}>
            
          <div>
              <label htmlFor=''>Name </label>
                <input onChange={handleOnChange} 
                  placeholder="Name..."
                  name='name' 
                  type="text" 
                  value={game.name} /> 
                {error.name ? <p>{error.name} ❌</p> : ""} <br></br>
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
                         { plataforms.map(p => {
                            return <option>{p}</option>         
                        })}
                    </select>  <br></br> 
                   {error.plataforms ?  <p>{error.plataforms} ❌</p> : ""}
          </div> 

          <div >
              {plataformsFrom.slice(0, 3)?.map(g => {
                return <div > 
                            <ul  className={style.xbtn}> 
                              <div onClick={(e) => removePlataforms(e)}> {`${g} ❌`}</div>
                            </ul>
                       </div>
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
                    {genreForm.slice(0, 5).map(g => {
                      return  <div className={style.xbtn}>
                                  <ul> 
                                      <li onClick={(e) => removeGenre(e)}> {`${g} ❌`}</li>
                                  </ul>
                              </div>
                    })}
                </div>
          <div>
                <label htmlFor=''>Rating </label>
                    <select onChange={handleOnChange} name="rating" value={game.rating}> 
                          {ratings?.map(r => {
                              return <option>{r}</option>
                          }) }
                    </select> 

                  <div className={style.ratingBox}>
                     {game.rating ? <p> Your Rating <p className={style.rating}> {game.rating} </p></p> : ""} 
                    <p>{error.rating ? error.rating : ""}</p> <br></br>
                  </div>
          </div>

          <div>
               <label htmlFor=''>Image </label>
                  <input 
                    onChange={handleOnChange} 
                    placeholder="Url Here..."
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
                  placeholder='Write Here...'
                  type="text" 
                  rows="3" 
                  cols="40" 
                  value={game.description} /> <br></br>
          </div>



        </form>
            
            <button onClick={(e) => handleSubmit(e)}  disabled={Object.keys(error).length > 1}> Create </button>
          
    </div>
  )
}