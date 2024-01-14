import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/contact.css';

function Contact() {
  const form = useRef();
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_25fbiyu', 'template_kh6p4gg', form.current, 'FH_1uvRAJCWjukuGo')
      .then(
        (result) => {
          alert('Poruka je uspješno poslana');
        },
        (error) => {
          alert('Greška prilikom slanja poruke!');
        }
      );
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="formC">
      <h1 className="titleC">Kontakt</h1>
      <form className="itemsC" ref={form} onSubmit={sendEmail}>
        <div className="fieldC">
          <label className={value ? 'labelFormValueC' : 'labelFormC'}>Ime</label>
          <input className="inputFormC" autoComplete="off" type="text" name="user_name" onChange={handleChange}/>
        </div>
        <div className="fieldC">
          <label className={value ? 'labelFormValueC' : 'labelFormC'}>Email</label>
          <input className="inputFormC" autoComplete="off" type="text" name="user_email" onChange={handleChange}/>
        </div>
        <div className="fieldC">
          <label className={value ? 'labelFormValueC' : 'labelFormC'}>Opis</label>
          <textarea className="inputFormC" autoComplete="off" type="text"  name="message" onChange={handleChange} />
        </div>
        <button className="buttonC" type="submit">
          Potvrdi
        </button>
      </form>
    </div>
  );
}

export default Contact;
