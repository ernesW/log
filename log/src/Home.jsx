import React from 'react'
import './Home.css'
import {Link} from 'react-router-dom'

export default function Home() {
  return (

    <>
    <div className="home">

    <header className="hero animated-hero"></header>

<div className="contenedor-botones">
  <Link to="/teoria" className="enlace-juego">
    <button className="salto">
      <h2>Intruduccion JavaScript</h2>
      <p>Funciones/Variables/Operadores...</p>
    </button>
  </Link>
</div>

<div className="contenedor-botones">
  <Link to="/dragongame" className="enlace-juego">
    <button className="salto">
      <h2>Dragon-Game JavaScript</h2>
      <p>Con este juego vemos las funciones básicas de JavaScript.</p>
    </button>
  </Link>
</div>

<footer>
  <div className="footer-container">
    <div className="logo">
      <img src="../public/4759.png" alt="Logo"/>
    </div>
  </div>
</footer>
    </div>
    
    
    </>
    
  )
}
