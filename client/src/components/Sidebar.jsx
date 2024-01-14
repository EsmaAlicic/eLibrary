import React, {useState,useEffect,useContext}  from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { slide as Menu } from 'react-burger-menu';
import "../styles/navbar.css";
import axios from 'axios';

function Sidebar() {
  const { currentUser, logout, isAdmin } = useContext(AuthContext);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  
  const logOutUser = () => {
    logout();
    navigate("/");
  }
  
  useEffect(()=>{
    const getUser = async() => {
      const res = await axios.get(`/users/${currentUser.id}`);
      // console.log( res.data);
      setUsername(res.data.username);
    }
    getUser();
  },[currentUser])

  return (
    <Menu>
    <div className='margin-space'></div>
    
      {currentUser ? <>
        <p className='link-title'> DOBRODOŠLI  </p> 
        <p className='link-title-name'>{username ? username : currentUser?.username }</p>
      </> : null}
      <Link className='link-sideBar' to="/"><p>POČETNA</p></Link>
      
      {isAdmin() ? 
        <div>
          <Link className="link-sideBar" to="/write"> <p>DODAJ KNJIGU</p></Link>
        </div> : null}

      {currentUser ? <div>
        <Link className='link-sideBar' to="/profile"><p>PROFIL</p></Link>
      </div> : null}

  
      {currentUser ? <div>
        <Link className='link-sideBar' to="/forum"><p>FORUM</p></Link>
      </div> : null}

      {currentUser? <span onClick={logOutUser} className="link-sideBar" >ODJAVA</span> :  null} 
      <div className='margin-space'></div>
      <div className='title-sideBar'><p>UNIVERZITET U ZENICI - FAKULTETI</p></div>

      <ul>
      <div className='title-sideBar'><p>POLITEHNIČKI FAKULTET</p></div>
      </ul>
      <ul>
      <li><Link className='link-sideBar' to="/?cat=antology"><p>Građevinarstvo</p></Link></li>
        <li><Link className='link-sideBar' to="/?cat=antology"><p>Proizvodni biznis</p></Link></li>
        <li><Link className='link-sideBar' to="/SI"><p>Softversko inženjerstvo</p></Link></li>
      </ul>
      <ul>
      <div className='title-sideBar'><p>MAŠINSKI FAKULTET</p></div>
      </ul>
      <ul>
        <li><Link className='link-sideBar' to="/?cat=antology"><p>Inženjerski dizajn proizvoda</p></Link></li>
        <li><Link className='link-sideBar' to="/?cat=antology"><p>Menadžment proizvodnim tehnologijama</p></Link></li>
        <li><Link className='link-sideBar' to="/?cat=antology"><p>Inženjerska ekologija</p></Link></li>
        <li><Link className='link-sideBar' to="/?cat=antology"><p>Održavanje</p></Link></li>
        <li><Link className='link-sideBar' to="/?cat=antology"><p>Mašinstvo</p></Link></li>
      </ul>
      
        <ul>
      <div className='title-sideBar'><p>FILOZOFSKI FAKULTET</p></div>
      </ul>
      <ul>
        <li><Link className='link-sideBar' to="/?cat=antology"><p>Razredna nastava</p></Link></li>
        <li><Link className='link-sideBar' to="/?cat=antology"><p>Matematika i informatika</p></Link></li>
        <li><Link className='link-sideBar' to="/?cat=antology"><p>Engleski jezik i književnost</p></Link></li>
        <li><Link className='link-sideBar' to="/?cat=antology"><p>Njemački jezik i književnost</p></Link></li>
        <li><Link className='link-sideBar' to="/?cat=antology"><p>Bosanski, hrvatski, srpski jezik i književnost</p></Link></li>
        <li><Link className='link-sideBar' to="/?cat=antology"><p>Turski jezik i književnost</p></Link></li>
        <li><Link className='link-sideBar' to="/?cat=antology"><p>Kulturalni studij</p></Link></li>
        <li><Link className='link-sideBar' to="/?cat=antology"><p>Tjelesni odgoj i sport</p></Link></li>
      </ul>
      <ul>
      <div className='title-sideBar'><p>EKONOMSKI FAKULTET</p></div>
      </ul>
      <ul>
        <li><Link className='link-sideBar' to="/?cat=antology"><p>Menadžment</p></Link></li>
        <li><Link className='link-sideBar' to="/?cat=antology"><p>Finansije i računovodstvo</p></Link></li>
      </ul>
      <ul>
      <div className='title-sideBar'><p>PRAVNI FAKULTET</p></div>
      </ul>
      <ul>
        <li><Link className='link-sideBar' to="/?cat=antology"><p>Pravo, opći smjer</p></Link></li>
      </ul>
      <ul>
      <div className='title-sideBar' ><p>MEDICINSKI FAKULTET</p></div>
      </ul>
      <ul>
      <li><Link className='link-sideBar' to="/?cat=antology"><p>Opća medicina</p></Link></li>
        <li><Link className='link-sideBar' to="/?cat=antology"><p>Zdravstvena njega</p></Link></li>
      </ul>
      
      <ul>
      <div className='title-sideBar'><p>ISLAMSKI PEDAGOŠKI FAKULTET</p></div>
      </ul>
      <ul>
      <li><Link className='link-sideBar' to="/?cat=antology"><p>Islamska vjeronauka</p></Link></li>
        <li><Link className='link-sideBar' to="/?cat=antology"><p>Socijalna pedagogija</p></Link></li>
        <li><Link className='link-sideBar' to="/?cat=antology"><p>Arapski jezik i književnost</p></Link></li>
        <li><Link className='link-sideBar' to="/?cat=antology"><p>Predškolski odgoj i obrazovanje</p></Link></li>
        <li><Link className='link-sideBar' to="/?cat=antology"><p>Inkluzivna nastava</p></Link></li>
      </ul> 
      <ul>
        <div className='title-sideBar'><p>METALURŠKO-TEHNOLOŠKI FAKULTET</p></div>
      </ul>
      <ul>
        <li><Link className='link-sideBar' to="/?cat=alternate history"><p>Metalurško inženjerstvo</p></Link></li>
        <li><Link className='link-sideBar' to="/?cat=alternate history"><p>Inženjerstvo materijala - Smjer za metalne materijale</p></Link></li>
        <li><Link className='link-sideBar' to="/?cat=alternate history"><p>Inženjerstvo materijala - Smjer za nemetalne materijale</p></Link></li>
        <li><Link className='link-sideBar' to="/?cat=alternate history"><p>Hemijsko inženjerstvo</p></Link></li>
        <li><Link className='link-sideBar' to="/?cat=alternate history"><p>Inženjerstvo zaštite okoliša</p></Link></li>
        <li><Link className='link-sideBar' to="/?cat=alternate history"><p>Zaštita na radu i zaštita od požara - Smjer za zaštitu na radu</p></Link></li>
        <li><Link className='link-sideBar' to="/?cat=alternate history"><p>Zaštita na radu i zaštita od požara - Smjer za zaštitu od požara</p></Link></li>
      </ul>
    </Menu>
  )
}

export default Sidebar