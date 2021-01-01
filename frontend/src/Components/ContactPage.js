import { Component } from "react";
import { Link } from "react-router-dom";


class ContactPage extends Component {

    componentDidMount() {
        document.querySelector('.contact').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    render() {
        return (
            <section className="contact">
                <div className="contact-container">
                    <form>
                        <h1 className="form-title">Envie a sua mensagem</h1>
                        <label className="required">Seu Nome</label>
                        <input required></input>
                        <label className="required">Seu Email</label>
                        <input required></input>
                        <label className="required">Assunto</label>
                        <input required></input>
                        <label className="required">Mensagem</label>
                        <textarea required></textarea>
                        <button type="submit">Enviar</button>
                    </form>
                    <div className="contact-info">
                        <div>
                            <h1>Informações</h1>
                            <div className="email">
                                <img alt="email" className="icon" src="/images/email.svg" />
                                <p>test@vix.com</p>
                            </div>
                            <div className="phone">
                                <img alt="phone" className="icon" src="/images/phone.svg" />
                                <p>27 99999-9999</p>
                            </div>
                            <div className="address">
                                <img alt="address" className="icon" src="/images/location.svg" />
                                <p>Rua um nº60 - Vila Velha ES</p>
                            </div>
                        </div>
                        <div>
                            <h2>Redes Sociais</h2>
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
                </div>
            </section>
        )
    }

}


export { ContactPage }

