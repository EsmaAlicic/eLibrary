import {Link, useLocation, useNavigate} from "react-router-dom";
import React, { useEffect,useState,useContext } from 'react';
import { AuthContext } from '../context/authContext';
import Menu from '../components/Menu';
import "../styles/single.css";
import moment from 'moment'
import axios from 'axios';

function Single() {
  //location must be defined before hooks to be used.
  const location = useLocation();
  const bookId = location.pathname.split("/")[2];
  const {currentUser} = useContext(AuthContext);
  const [book,setBook] = useState([]);
  const navigate = useNavigate();
  const [desc,setDesc] = useState("");
  

  //  console.log(bookId)
  useEffect(()=>{
    const fetchData = async() =>{
      try{
        const res = await axios.get(`/books/${bookId}`);
        console.log(res.data)
        setBook(res.data); 
      }catch(err){
        console.log(err);
      }
    }
    fetchData();
  },[bookId])

  const handelDelete = async() => {
    try{
      await axios.delete(`/books/${bookId}`);
      navigate("/")
    }catch(err){
      console.log(err);
    }  
  }

  useEffect(()=>{
    const fetchData = async() =>{
      try{
        const res = await axios.get(`/books${desc}`);
        console.log(res.data)
        setDesc(res.data); 
      }catch(err){
        console.log(err);
      }
    }
    fetchData();
  },[desc])

  return (        
    <div className='main-box-single'>
      <h1 className='title-single'>{book.title}</h1>
      <div className='content-box-single'>
        <div className='user-info'> 
          <img className='img-single' src={`../upload/${book?.img}`} alt="img here"/>
            <div className='description-single'>
              <h2 className='description-title-single'>Opis</h2>
              <a href={book.desc} target="_blank" rel="noopener noreferrer">{book?.desc}</a>
            </div>
            
            <div className='book-info'>
              {book.userImg &&<img className='avatar-single' src={`../upload/${book.userImg}` } alt="user image"/>}
              <div className='avatar-text-single'>
                <p>Objavljeno {moment(book.date).fromNow()}</p>
                <p> {book.username}</p>
              </div>
            </div>
      
            {currentUser?.username === book.username && (
            <div  className='user-actions'>
              <Link className='button-single' to={`/write?edit=${bookId}`} state={book}>
                Uredi
              </Link>
              <Link className='button-delete-single' onClick={handelDelete}>Obriši</Link>
            </div>
            )}
        </div>
      </div >
      <div className='recomendations'>
        <Menu cat={book.cat}/>
      </div>
    </div>
  )
}

export default Single