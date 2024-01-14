import React, { useEffect,useState } from 'react';
import { useLocation} from "react-router-dom";
import Card from '../components/Card';
import "../styles/SI.css";
import axios from 'axios';
import logo from "../pages/logo.png";



function SI() {
  const [onlyCat,SetOnlyCat] = useState("");
  const [books,setBooks] = useState([]);
  const [title,setTitle] = useState("");
  const cat = useLocation().search;

  useEffect(()=>{
    let onlyCatArry = cat.split("=")
    console.log("Cat " + onlyCatArry);
    SetOnlyCat(onlyCatArry[1]);
  },[cat])
  
  useEffect(()=>{
    const fetchData = async() =>{
      try{
        const res = await axios.get(`/books${cat}`);
        setBooks(res.data); 
      }catch(err){
        console.log(err);
      }
    }

  const fetchData2 = async() =>{
    let getCat = ()=>{
      if(onlyCat === undefined){
        return cat
      }else{
        return onlyCat
      }
   }
      
    try{
      const res = await axios.get(`/books/search/?cat=${getCat()}&title=${title}`);
      setBooks(res.data); 
    }catch(err){
      console.log(err);
    }
  }

  if(title === ""){
      fetchData();
  }else{
      fetchData2();
  }
},[cat,title])

  return (
    <div className='home-body'>
      <div className='baner-elements'>
      <img src={logo} className="logo"></img>
        {/*<h1 className='home-title'>eLibrary</h1>*/}
        <input className='search' type={"text"} placeholder="Pretraži naslove..." onChange={e=>setTitle(e.target.value)}/>
      </div> 

      
      <div className="landing-container">
        <div>
          <div className='card-flex'>
            {books?.map(book=> (
              <Card key={book.id}>{book}</Card> 
             ))} 
          </div>
            </div> 
      </div>
    </div>
  )
}

export default SI

