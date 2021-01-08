import { Component } from "react"
import { Link } from "react-router-dom"

class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="useful-links">
                    <div className="footer-block">
                        {/* <h1>Informações</h1> */}
                        <div className="footer-row">
                            <img alt="email" className="icon" src="/images/email.svg" />
                            <p>test@vix.com</p>
                        </div>
                        <div className="footer-row" >
                            <img alt="phone" className="icon" src="/images/phone.svg" />
                            <p>27 99999-9999</p>
                        </div>
                        <div className="footer-row" >
                            <img alt="address" className="icon" src="/images/location.svg" />
                            <p>Rua um nº60 - Vila Velha ES</p>
                        </div>
                    </div>
                    <div className="footer-block">
                        {/* <h2>Redes Sociais</h2> */}
                        <div className="social-media-icons">
                            <div className="icon-link">
                                <Link to="">
                                    <img alt="whatsapp" className="social-media-icon" src="/images/whatsapp.svg" />
                                </Link>
                            </div>
                            <div className="icon-link">
                                <Link to="">
                                    <img alt="facebook" className="social-media-icon" src="/images/facebook.svg" />
                                </Link>
                            </div>
                            <div className="icon-link">
                                <Link to="">
                                    <img alt="instagram" className="social-media-icon" src="/images/instagram.svg" />
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="footer-row copyright">
                    © 2020 Vix Decoração . All Rights Reserved | Design by John
                </div>
            </footer >
        )
    }

}


export { Footer }

