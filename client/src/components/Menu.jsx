import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "../styles/menu.css"
import axios from 'axios';

function Menu({cat}) {
    const [books,setBooks] = useState([]);

    useEffect(()=>{
      const fetchData = async() =>{
        try{
          const res = await axios.get(`/books/?cat=${cat}`);
          console.log("flag" + res.data)
          setBooks(res.data); 
        }catch(err){
          console.log(err);
        }
      }
      fetchData();
    },[cat])


  return (
    <div className='main-box-menu'> 
        <div>
            <h2 className='recomendation-title-menu'>Preporučeno</h2>
            {books.slice(0, 3).map((book)=> (
            <div key={book.id} className="recomendation-box-menu">
              <Link className='link-menu' to={"/book/" + book.id}>
                 <h3 className='secondary-title-menu'>{book.title}</h3>
                 <div className='content-menu'>
                   <p className='paragrph-menu'>{book.desc}</p>
                   <img className='img-menu' src={`../upload/${ book.img}`} alt="img here"/>
                 </div>
              </Link>
            </div>
        ))}  
        </div>
    </div>
  )
}

export default Menu