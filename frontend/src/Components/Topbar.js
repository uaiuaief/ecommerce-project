import { Component } from "react"
import { Link } from 'react-router-dom';
import { Navbar, NavbarItem } from './Navbar.js';

class Topbar extends Component {
    state = {
        itens_in_cart: 1,
        username: '',
        password: '',
        logged_in: false,
        show_menu: false,
    }

    dropMenu(e) {
        // let element = document.querySelector('.user-menu-box')
        // this.setState({
        //     show_menu: !this.state.show_menu
        // }, () => {
        //     let visibility = this.state.show_menu ? 'visible' : 'hidden'
        //     console.log(visibility, this.state.show_menu);
        //     element.style.visibility = visibility;
        // })

    }

    render() {
        const [appState, setAppState] = this.props.appState;
        return (
            <div className="topbar">
                <div className="topbar-content">

                    <div className="left-side">
                        {/* <div className="topbar-item email">
                        <img alt="email" className="icon" src="/images/email.svg" />
                        <p>test@vix.com</p>
                    </div>
                    <div className="topbar-item phone">
                        <img alt="phone" className="icon" src="/images/phone.svg" />
                        <p>27 99999-9999</p>
                    </div> */}
                        <div className="logo">
                            <Link to="/">
                                {/* <img src="/images/vixlogo.png" /> */}
                                <h1>Logo</h1>
                            </Link>
                        </div>
                    </div>
                    <div className="navbar-container">
                        <Navbar appState={this.props.appState} />
                    </div>
                    <div className="right-side">
                        {localStorage.getItem('Token')
                            ?
                            <div className="user-menu">
                                {/* <Link to={`/profile/${localStorage.getItem('user_id')}`}>Olá {localStorage.getItem('username')}</Link> */}
                                <Link className="user-menu" onClick={e => this.dropMenu(e)}>Olá {localStorage.getItem('username')}</Link>
                                <div className="user-menu-box">
                                    <Link className="menu-option" to={`/profile/${localStorage.getItem('user_id')}`}>
                                        <img alt="profile" className="icon" src="/images/account_circle.svg" />
                                        Minha Conta
                                    </Link>
                                    <Link className="menu-option" to="/my_purchases">
                                        <img alt="my-purchases" className="icon" src="/images/shopping_bag.svg" />
                                        Minhas Compras
                                    </Link>
                                    <Link to='/logout' className="menu-option">
                                        <img alt="logout" className="icon logout-icon" src="/images/logout.svg" />
                                        Sair
                                    </Link>
                                </div>
                            </div>
                            :
                            <>
                                <Link to="/login" className="topbar-item login link">
                                    <img alt="login" className="icon" src="/images/account_circle.svg" />
                                    Login
                                </Link>
                                <Link to="/register" className="topbar-item register link">
                                    <img alt="register" className="icon" src="/images/sign-up.svg" />
                                    Cadastre-se
                                </Link>
                            </>}
                        <Link to="/shopping-cart" className="topbar-item shopping-cart">
                            <div className="cart-wrapper">
                                {/* <Link to="/shopping-cart"></Link> */}
                                <img src="/images/shopping_cart.svg" className="icon" />
                                <small>{appState.cart_amount}</small>
                            </div>
                        </Link>
                    </div>
                    {/* <div className="right-side social-media-icons">
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
                </div> */}
                </div>
            </div >
        )
    }

}


export { Topbar }
