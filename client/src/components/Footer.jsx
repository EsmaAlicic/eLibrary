import React from "react";
import "../styles/footer.css"
import { FaHeart } from "react-icons/fa";
import { FaFacebook} from "react-icons/fa";
import {FaTwitter} from "react-icons/fa";
import {FaLinkedin} from "react-icons/fa";
import {FaInstagram} from "react-icons/fa";

function Footer(){
    return (
        <div className="footer">
            <div className="section_padding">
                <div className="footer-links">
                    <div className="links-div">
                        <h4>eLibrary</h4></div>
                    <div className="links-div">
                        <h4>KORISNI LINKOVI</h4>
                        <p>Vaš profil</p>
                        <p>Pomoć</p>
                    </div>
                    <div className="social-icons">
                     <a href=" https://www.facebook.com/" target="_blank" rel="noopener noreferrer" > <p><FaFacebook/></p></a>
                     <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><p><FaTwitter/></p></a>
                     <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><p><FaLinkedin/></p></a>
                     <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><p><FaInstagram/></p></a>
                    </div>
                </div>
            </div>
        <hr></hr>
        <div className="footer-below" >
            <div className="footer-copyright">
                <p>
                    @{new Date().getFullYear()} eLibrary. Sva prava zadržana.
                </p>
                <p>Made with love <FaHeart/></p>

            </div>
        </div>
        </div>
    )
}
export default Footer