import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { GetGenres, byDataBase, byRating, all, byGenres, asc, desc, resetFilter} from '../../store/actions'
import { Link } from 'react-router-dom'

export default function Nav() {
    let allGenres = useSelector((state) => state.genres)
    let dispatch = useDispatch()
    useEffect(() => {
      dispatch(GetGenres())
    }, [dispatch])

    function genres(e) {
        e.preventDefault()
        dispatch(byGenres(e.target.value))
    };

    function orderABC(e) {
        e.preventDefault()
        e.target.value === 'asc'
        ? dispatch(asc())
        : dispatch(desc())
    };

    function rating(e) {
        e.preventDefault()
        dispatch(byRating(e.target.value))
    };

    function dataBase(e) {
        e.preventDefault()
        e.target.value === "dataBase" 
        ? dispatch(byDataBase())
        : dispatch(all())
        
    };

    function reset(e) {
        e.preventDefault()
        dispatch(resetFilter())
    }

  return (
    <div>
        <Link to={"/create"}> <button> Create Video Game </button> </Link>
        <button onClick={(e) => reset(e)}> Reset Filters </button>
        <select onChange={(e) => orderABC(e)}>
          <option enable>Order by...</option>
          <option value="asc">A - Z </option>
          <option value="desc">Z - A </option>
        </select>

        <select onChange={(e) => rating(e)}>
          <option enable>Order by Rating...</option>
          <option value='highest'> Highest to lowest</option>
          <option value='lowest'> Lowest to highest</option>
        </select>

        <select onChange={(e) => dataBase(e)}>
          <option value="all">All</option>
          <option value="dataBase">Created by you</option>
        </select>

        <select enable="true" onChange={(e) => genres(e)}>
          <option enable>Order By Genres..</option>
          {allGenres.map((g) => {
            return <option value={g.name}>{g.name}</option>
          })}

        </select>

        <div>
            <SearchBar/>
        </div>
    </div>
  )
}
