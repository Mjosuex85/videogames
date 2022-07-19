import React from 'react'
import { Link } from 'react-router-dom'
import style from './landing.module.css'
import logo from '../Nav/sources/6f8826136bdf5039cd13182315de38c0.svg'

export default function LandingPage() {
  return (
    <div className={style.container} >
      <img src={logo} alt="" />
            
            {/* <span className={style.intro}> ¡Wiki Games! </span> */}
        
        <Link to={'/home'} className={style.text}>
          <p> Home </p>
        </Link>

    </div>
  )
}
