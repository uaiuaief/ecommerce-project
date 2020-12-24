import { Component } from "react"
import { Link } from 'react-router-dom';

class Topbar extends Component {
    state = {
        itens_in_cart: 1,
        username: '',
        password: '',
        logged_in: false
    }

    render() {
        return (
            <div className="topbar">
                <div className="left-side">
                    <div className="topbar-item email">
                        <img alt="email" className="icon" src="/images/email.svg" />
                        <p>test@vix.com</p>
                    </div>
                    <div className="topbar-item phone">
                        <img alt="phone" className="icon" src="/images/phone.svg" />
                        <p>27 99999-9999</p>
                    </div>
                    {localStorage.getItem('Token')
                        ?
                        <>
                            <div>
                                <Link to={`/profile/${localStorage.getItem('user_id')}`}>Olá {localStorage.getItem('username')}</Link>
                            </div>
                            <div className="topbar-item login link">
                                <img alt="logout" className="icon logout-icon" src="/images/login.svg" />
                                <Link to='/logout' >Sair</Link>
                            </div>
                        </>
                        :
                        <>
                            <div className="topbar-item login link">
                                <img alt="login" className="icon" src="/images/login.svg" />
                                <Link to="/login">Login</Link>
                            </div>
                            <div className="topbar-item register link">
                                <img alt="register" className="icon" src="/images/register.svg" />
                                <Link to='/register'>Cadastre-se</Link>
                            </div>
                        </>}

                    {/* <div className="topbar-item login link">
                        <img alt="login" className="icon" src="/images/login.svg" />
                        <Link to="/login">Login</Link>
                    </div>
                    <div className="topbar-item register link">
                        <img alt="register" className="icon" src="/images/register.svg" />
                        <Link to='/register'>Register</Link>
                    </div> */}
                </div>
                <div className="right-side social-media-icons">
                    <div className="">
                        <Link to="">
                            <img alt="whatsapp" className="social-media-icon" src="/images/whatsapp.svg" />
                        </Link>
                    </div>
                    <div className="">
                        <Link to="">
                            <img alt="facebook" className="social-media-icon" src="/images/facebook.svg" />
                        </Link>
                    </div>
                    <div className="">
                        <Link to="">
                            <img alt="instagram" className="social-media-icon" src="/images/instagram.svg" />
                        </Link>
                    </div>
                </div>
            </div >
        )
    }

}


export { Topbar }
