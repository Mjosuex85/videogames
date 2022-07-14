import React from 'react'
import { byName } from '../../store/actions.js'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import img1 from './img2.jpg'

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
    console.log(e.target.value)
  }
  
  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <input type="text" onChange={onChange} placeholder="Search a Game..." value={search}  />
        <input disabled={!search} type="submit" value="Search" />
      </form>
    </div>
  )
}