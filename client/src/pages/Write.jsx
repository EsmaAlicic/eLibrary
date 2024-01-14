import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import "../styles/write.css";
import moment from "moment";
import axios from "axios";

function Write() {
  const state = useLocation().state;
  const [title, setTitle] = useState(state?.title || null);
  const [value, setValue] = useState(state?.desc || null);
  const [cat, setCat] = useState(state?.cat || null);
  const { currentUser } = useContext(AuthContext);
  const hiddenFileInput = React.useRef(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser == null) {
      navigate("/");
    }
  }, [currentUser]);

  const uplaod = async () => {
    if (file !== null) {
      try {
        console.log("flag1 ");
        const formData = new FormData();
        console.log("flag2 ");
        formData.append("file", file);
        console.log("flag3 ");
        const res = await axios.post("/upload", formData);
        console.log("in upload " + res.data);
        return res.data;
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await uplaod();
    try {
      state
        ? await axios.put(`/books/${state.id}`, {
          title,
          desc: value,
          cat,
          img: file ? imgUrl : state?.img,
        })
        : await axios.post(`/books/`, {
          title,
          desc: value,
          cat,
          img: file ? imgUrl : null,
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        });
      navigate("/");
    } catch (err) {
      console.log(err);
      setError("Prazna polja nisu dozvoljena!");
    }
  };

  const handleClick1 = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <div>
      {currentUser ? (
        <div className="main-div-write">
          <h1 className="title-write">DODAJ NOVU KNJIGU</h1>
          <label className="label-write">Naslov</label>
          <input
            className="input-write"
            type={"text"}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <label className="label-write">Opis</label>
          <textarea
            className="input-write"
            type={"text"}
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <label className="label-write">Kategorija</label>
          <select className="select-write" onChange={(e) => setCat(e.target.value)}value={cat} >
            <option value={null}> Izaberi smjer:</option>
            <option value={"Građevinarstvo"}>Građevinarstvo</option>
            <option value={">Proizvodni biznis"}>Proizvodni biznis</option>
            <option value={"Softversko inženjerstvo"}>Softversko inženjerstvo</option>
            <option value={"Inženjerski dizajn proizvoda"}>Inženjerski dizajn proizvoda</option>
            <option value={"Menadžment proizvodnim tehnologijama"}>Menadžment proizvodnim tehnologijama</option>
            <option value={"Inženjerska ekologija"}>Inženjerska ekologija</option>
            <option value={"Održavanje"}>Održavanje</option>
            <option value={"Mašinstvo"}>Mašinstvo</option>
            <option value={"Razredna nastava"}>Razredna nastava</option>
            <option value={"Matematika i informatika"}>Matematika i informatika</option>
            <option value={"Engleski jezik i književnost"}>Engleski jezik i književnost</option>
            <option value={"Njemački jezik i književnost"}>Njemački jezik i književnost</option>
            <option value={"Bosanski, hrvatski, srpski jezik i književnost"}>Bosanski, hrvatski, srpski jezik i književnost</option>
            <option value={"Turski jezik i književnost"}>Turski jezik i književnost</option>
            <option value={"Kulturalni studij"}>Kulturalni studij</option>
            <option value={"Tjelesni odgoj i sport"}>Tjelesni odgoj i sport</option>
            <option value={"Menadžment"}>Menadžment</option>
            <option value={"Finansije i računovodstvo"}>Finansije i računovodstvo</option>
            <option value={"Pravo, opći smjer"}>Pravo, opći smjer</option>
            <option value={"Opća medicina"}>Opća medicina</option>
            <option value={"Zdravstvena njega"}>Zdravstvena njega</option>
            <option value={"Islamska vjeronauka"}>Islamska vjeronauka</option>
            <option value={"Socijalna pedagogija"}>Socijalna pedagogija</option>
            <option value={"Arapski jezik i književnost"}>Arapski jezik i književnost</option>
            <option value={"Predškolski odgoj i obrazovanje"}>Predškolski odgoj i obrazovanje</option>
            <option value={"Inkluzivna nastava"}>Inkluzivna nastava</option>
            <option value={"Metalurško inženjerstvo"}>Metalurško inženjerstvo</option>
            <option value={"Inženjerstvo materijala - Smjer za metalne materijale"}>Inženjerstvo materijala - Smjer za metalne materijale</option>
            <option value={"Inženjerstvo materijala - Smjer za nemetalne materijale"}>Inženjerstvo materijala - Smjer za nemetalne materijale</option>
            <option value={"Hemijsko inženjerstvo"}>Hemijsko inženjerstvo</option>
            <option value={"Inženjerstvo zaštite okoliša"}>Inženjerstvo zaštite okoliša</option>
            <option value={"Zaštita na radu i zaštita od požara - Smjer za zaštitu na radu"}>Zaštita na radu i zaštita od požara - Smjer za zaštitu na radu</option>
            <option value={"Zaštita na radu i zaštita od požara - Smjer za zaštitu od požara"}>Zaštita na radu i zaštita od požara - Smjer za zaštitu od požara</option>
          </select>
          <label className="label-write">Slika</label>
          <>
            <button onClick={handleClick1} className="button-write">
              Dodaj sliku
            </button>
            <input
              ref={hiddenFileInput}
              style={{ display: "none" }}
              type={"file"}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </>
          {file ? <p className="image-text">{file.name}</p> : null}
          <p className="error-write">{error}</p>
          <button className="button-write" onClick={handleClick}>
            Objavi
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Write;
