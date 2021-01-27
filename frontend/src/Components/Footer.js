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
                            <p>vendas@pellington.com</p>
                        </div>
                        <div className="footer-row" >
                            <img alt="phone" className="icon" src="/images/phone.svg" />
                            <p>41 99945-0056</p>
                        </div>
                        <div className="footer-row" >
                            <img alt="address" className="icon" src="/images/location.svg" />
                            <p>Rua Acácias nº60 - Curitiba PR</p>
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
                    © 2020 Pellington Orgânicos . All Rights Reserved | Design by John
                </div>
            </footer >
        )
    }

}


export { Footer }

