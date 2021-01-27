import { Component } from "react"
import { Link } from 'react-router-dom';
import { Navbar } from './Navbar.js';
import { FlashMessage } from './FlashMessage.js'

class Topbar extends Component {
    state = {
        itens_in_cart: 1,
        username: '',
        password: '',
        logged_in: false,
        show_navbar: 'hidden',
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

    toggleNavbar(e) {
        // let element = document.querySelector('.mobile-navbar')
        // console.log(this.state.show_navbar);
        let visibility = this.state.show_navbar === 'visible' ? 'hidden' : 'visible'
        this.setState({
            show_navbar: visibility
        })
    }

    render() {
        const [appState, setAppState] = this.props.appState;
        return (
            <div className="topbar">
                {appState.flash_message
                    ?
                    <FlashMessage
                        appState={this.props.appState} />
                    :
                    ''
                }

                <div id="default-topbar" className="topbar-content">
                    <div className="left-side">
                        <div className="logo">
                            <Link to="/">
                                {/* <img src="/images/ecommerce-logo.png" /> */}
                                <h1>Pellinton Organicos</h1>
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
                                <Link className="user-menu" onClick={e => this.dropMenu(e)}>Olá {localStorage.getItem('username')} <img src="/images/expand.svg" alt="expand" /></Link>
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
                                <img src="/images/shopping_cart.svg" className="icon" alt="cart-icon"/>
                                <small>{appState.cart_amount}</small>
                            </div>
                        </Link>
                    </div>
                </div>
                <div id="mobile-topbar" className="topbar-content">
                    {/* <Link to="/"> */}
                        {/* <img src="/images/vixlogo.png" /> */}
                        {/* <h1>Logo</h1> */}
                    {/* </Link> */}
                        <div className="logo">
                            <Link to="/">
                                {/* <img src="/images/ecommerce-logo.png" /> */}
                                <h1>Pellinton Organicos</h1>
                            </Link>
                        </div>
                    <div>
                        <button onClick={e => this.toggleNavbar(e)} id="mobile-navbar-button">
                            {this.state.show_navbar === 'hidden'
                                ?
                                <img src="/images/menu-icon.svg" alt="menu-icon" />
                                :
                                <img src="/images/close.svg" alt="menu-icon" />
                            }
                        </button>
                    </div>
                </div>
                <div className='mobile-navbar' style={{
                    visibility: this.state.show_navbar
                }}>
                    {/* <Link to="/shopping-cart" className="topbar-item shopping-cart">
                        <div className="cart-wrapper">
                            <img src="/images/shopping_cart.svg" className="icon" />
                            <small>{appState.cart_amount}</small>
                        </div>
                    </Link>
                    {localStorage.getItem('Token')
                        ?
                        <div className="user-menu mobile-user-menu">
                            <Link className="user-menu" onClick={e => this.dropMenu(e)}>Olá {localStorage.getItem('username')} <img src="/images/expand.svg" /></Link>
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
                        <div className="account-links">
                            <Link onClick={e => this.toggleNavbar(e)} to="/login">Login</Link>
                            <Link onClick={e => this.toggleNavbar(e)} to="/register">Cadastre-se</Link>
                        </div>
                    } */}




                    {localStorage.getItem('Token')
                        ?
                        <>
                            <div className="flex">
                                <p className="user-menu">
                                    Olá {localStorage.getItem('username')}
                                </p>
                                <Link onClick={e => this.toggleNavbar(e)} to="/shopping-cart" className="topbar-item shopping-cart">
                                    <div className="cart-wrapper">
                                        <img src="/images/shopping_cart.svg" className="icon" alt="cart-icon" />
                                        <small>{appState.cart_amount}</small>
                                    </div>
                                </Link>


                            </div>
                            <div className="login-options">
                                <Link onClick={e => this.toggleNavbar(e)} to={`/profile/${localStorage.getItem('user_id')}`}> Minha Conta </Link>
                                <Link onClick={e => this.toggleNavbar(e)} to="/my_purchases"> Minhas Compras </Link>
                                <Link onClick={e => this.toggleNavbar(e)} to="/logout">Sair</Link>
                            </div>
                        </>
                        :
                        <div className="login-options">
                            <Link onClick={e => this.toggleNavbar(e)} to="/login"> Login </Link>
                            <Link onClick={e => this.toggleNavbar(e)} to="/register"> Cadastre-se </Link>
                        </div>}
                    <Link onClick={e => this.toggleNavbar(e)} to="/">Início</Link>
                    <Link onClick={e => this.toggleNavbar(e)} to="/about">Sobre Nós</Link>
                    <Link onClick={e => this.toggleNavbar(e)} to="/contact">Contato</Link>
                    
                </div>

            </div >
        )
    }

}


export { Topbar }
