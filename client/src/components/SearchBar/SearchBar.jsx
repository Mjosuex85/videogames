import React from 'react'
import { byName } from '../../store/actions.js'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import s from './search.module.css'

export default function SearchBar() {
  const [search, setSearch] = useState("")
  const dispatch = useDispatch()
  
  function onSubmit(e) {
    e.preventDefault()
    dispatch(byName(search))
  }

  function onChange(e) {
    e.preventDefault()
    setSearch(e.target.value)
  }
  
  return (
    <div className={s.space}>
      <form className={s.search} onSubmit={(e) => onSubmit(e)}>
        <input type="text" 
              onChange={onChange} 
              placeholder="Search a Game..." 
              className={s.search__input}
              /* value={search} *//>
              
        <button className={s.btn} disabled={!search} type="submit" value="Search">Search</button>
      </form>
    </div>
  )
}