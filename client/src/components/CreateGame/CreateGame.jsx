import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ratings, plataforms } from './plataforms'
import { GetGenres, allGames} from '../../store/actions'
import style from './create.module.css'
import Swal from 'sweetalert2'

export default function CreateGame() {
  const genresState = useSelector((state) => state.genres)
  const games = useSelector((state) => state.allvideoGames.filter(e => e.createdInDb).map(e => e.name))
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(GetGenres())
    dispatch(allGames())
  }, [dispatch])
 
  const x = games.map(e => e.toLowerCase())

  ////////////////////////////////////////////////////////////////////////// ESTADOS ///////////////////////////////////////////////////////

  const [ error, setError] = useState({})
  const [ game, setGame ] = useState({})
  const [ genreForm, setGenre ] = useState([])
  const [ plataformsFrom , setPlataformsFrom] = useState([])
  const [ img , setImg ] = useState({img: "https://admin.esment.org/uploads/flat_pages/no.gif"})


 function bann_unBann(e) {
  e.preventDefault()
  Swal.fire({
    title: 'What do you want to do with this user?',
    showDenyButton: true,
    showCancelButton: true, 
    denyButtonText: `Bann or Unbann user`,
    confirmButtonText: 'Make a user Admin',
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed /* make admin */) {
  
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are you sure to make admin this user?',
        text: "You can revert this option later!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, make it admin!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed /* BANN */) {
          
          swalWithBootstrapButtons.fire(
            'The user is now a admin',
            'the user now has this roles: - dkkkdd - jdkddjfk!.',
            'success'
          )
         /*  dispatch(bann_unBann({   // DISPACHAR LA ACIÓN PARA BANEAR O DESBANEAR
            typeOfEdit,
            id,
          })) */
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'The user is not an admin',
            'error'
          )
        }
      })
        
    
    } else if (result.isDenied) {
      let typeOfEdit = e.target.value === "ban"
        let id = e.target.value
        
        ? typeOfEdit = "ban"
        : typeOfEdit = "unBann"
        
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })
        
        swalWithBootstrapButtons.fire({
          title: 'Are you sure to bann this user?',
          text: "You cant revert this option!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, benned it!',
          cancelButtonText: 'cancel!',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed /* BANN */) {
            
            swalWithBootstrapButtons.fire(
              'User Banned!',
              'The User has been banned you can unbann later.',
              'success'
            )
           /*  dispatch(bann_unBann({   // DISPACHAR LA ACIÓN PARA BANEAR O DESBANEAR
              typeOfEdit,
              id,
            })) */
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              'The user still on',
              'error'
            )
          }
        })
    
      ;  
    }
  })
 }

  //////////////////////////////////////////////////////////////////// VALIDACIONES ////////////////////////////////////////////////////////////////////
  const validate = (input) => {
    let error = {}
    
    if (!input.name) {
        error.name = "Name is required"
    }

    else if (x.includes(input.name.toLowerCase())) {
        error.name = "the game is alredy Created"
    }

    else if (input.name.length > 30) {
        error.name = "text length is not allowed"
    }

    if (!input.di) {
        error.img = "Image is required"
    }

    else if (input.img.length  > 200) {
        error.img = "text length is not allowed"
    }

    else if (!/(.jpg|.jpeg|.gif|.png|.bmp|.tiff|.tga|.svg)/.test(input.img)) {
        error.img = "The url format is not allowed"
    }

    if (!input.released) {
        error.released = "You need a date"
    }

    /* if (input.plataforms.length === 0 || !input.plataforms) {
        error.platforms = "You need at least one Plataforms"
    }

    if (!input.genres.length === 0 || !input.genres) {
        error.genres = "You need at least one Genre"
    } */

    if (!input.description) {
        error.description = "Required"
    }

    else if (input.description.length > 200) {
        error.description = "text length is not allowed"
    }


    return error
}

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
    
    function onInputChange2(e) {
      e.preventDefault()
      if (!genreForm.includes(e.target.value))
      setGenre([
        ...genreForm,
        e.target.value
      ])
    }
    
    function onInputChange3(e) {
        e.preventDefault()
        console.log(e.target)
        if (!plataformsFrom.includes(e.target.value)) {
          setPlataformsFrom([
            ...plataformsFrom,
            e.target.value
          ])
          
        }
    }
      
    const handleSubmit =  async (e) => {
        e.preventDefault()
        let x = await axios.post(`http://localhost:3856/videogames/`, game)
        /* .then((res) => {
          
        }) */
        alert(x.data.name.toUpperCase() + " was succesfully added")
        window.history.back();

    }

////////////////////////////////////////////////////////////////// FORMULARIO ////////////////////////////////////////////////////////////////////////////////////////

  return (

   
    <div className={style.container}>
        <Link to='/home'><button>Go Back</button></Link>
                <h1> Create your VideoGame</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <button onClick={(e) => bann_unBann(e)}>DALE CLICK</button>
            
          <div className={style.label}>
              <label htmlFor=''>Name </label>
                <input onChange={(e) => handleOnChange(e)} 
                  placeholder="Name..."
                  name='name' 
                  type="text" 
                  value={game.name} /> 
                {error.name ? <p>{error.name} ❌</p> : ""} <br></br>
          </div>    
            
          <div>
              <label htmlFor='Released '>Released </label>
                <input onChange={(e) => handleOnChange(e)} 
                  name='released' 
                  type="date" 
                  value={game.released} /> <br></br>
          </div>
            
          <div>
                <label htmlFor='Plataforms'>Plataforms </label>
                    <select  onChange={(e) => onInputChange3(e)} name="plataforms" value={plataformsFrom}> 
                         { plataforms.map((p, i) => {
                            return <option key={i}>{p}</option>         
                        })}
                    </select>  <br></br> 
                   {error.plataforms ?  <p>{error.plataforms} ❌</p> : ""}
          </div> 

          <div >
              {plataformsFrom.slice(0, 3)?.map((g, i) => {
                return <div key={i} >
                            <ul className={style.xbtn}> 
                              <div onClick={(e) => removePlataforms(e)}> {`${g} ❌`}</div>
                            </ul>
                       </div>
              })}
          </div>


          <div>    
            <label htmlFor='Genres'> Genres </label>
                <select onChange={(e) => onInputChange2(e)} name="plataforms" value={genreForm} > 
                   {genresState?.map((t, i) => {
                      return <option key={i} value={t.name}>{t.name}</option>
                  })}
               
                </select> <br></br>
          </div>
               <div>
                    {genreForm.slice(0, 5).map((g, i) => {
                      return  <div key={i} className={style.xbtn}>
                                  <ul> 
                                      <li onClick={(e) => removeGenre(e)}> {`${g} ❌`}</li>
                                  </ul>
                              </div>
                    })}
                </div>
          <div>
                <label htmlFor='Rating'>Rating </label>
                    <select onChange={(e) => handleOnChange(e)} name="rating" value={game.rating}> 
                          {ratings?.map((r, i) => {
                              return <option key={i}>{r}</option>
                          }) }
                    </select> 

                  <div className={style.ratingBox}>
                     
                     <div>Your Rating <p className={style.rating}> {game.rating} </p></div> 
                    
                    <p>{error.rating ? error.rating : ""}</p> <br></br>
                  </div>
          </div>

          <div>
               <label htmlFor='Image '>Image </label>
                  <input 
                    onChange={(e) => handleOnChange(e)} 
                    placeholder="Url Here..."
                    name='img' 
                    type="text" 
                    value={game.img}/> <br></br> 
                <img src={img.img}  width="200" height="150"/> <br /><br />
                {error.img ? <p>{error.img} ❌</p> : ""} <br></br>
          </div>

          <div>
             <label htmlFor='ScreenShots'>ScreenShots</label>
                <input 
                  onChange={(e) => handleOnChange(e)} 
                  name='screenshots' 
                  type="text" 
                  value={game.screenshots} /> <br></br>
          </div>

          <div>  
             <label htmlFor='Description'>Description</label>
                <textarea
                  onChange={(e) => handleOnChange(e)} 
                  name='description'
                  placeholder='Write Here...'
                  type="text" 
                  rows="3" 
                  cols="40" 
                  value={game.description} /> <br></br>
                  {error.description ? <p>{error.description} ❌</p> : ""}
          </div>
        </form>
            
            <button onClick={(e) => handleSubmit(e)}  disabled={Object.keys(error).length > 1}> Create </button>
          
    </div>
    
  )
}