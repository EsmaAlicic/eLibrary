import React from 'react';
import "../styles/home.css";
import logo from "../pages/logo.png";

function Home() {
  return (
    <div className='home-body'>
      <div className='baner-elements'>
        <img src={logo} alt="logo" className="logo"></img>
      </div> 

      <div class="contentPocetna">
    <h1>“Jedinu pravu sigurnost u današnjem svijetu čovjeku mogu pružiti znanje, iskustvo i sposobnost.”</h1>
  </div>
   
    </div>
  )
}

export default Home