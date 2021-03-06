import { Component } from "react"
import { Link, Redirect } from 'react-router-dom';


const NavbarItem = (props) => {
    let highlighted = props.name === props.highlighted;
    let cls = highlighted ? "link navbar-item current-page" : "link navbar-item"
    return (
        <Link to={props.to}
            onClick={e => props.func(e, props.name)}
            className={cls}>
            {props.text}
        </Link>
    )
}


class Navbar extends Component {
    state = {
        input_text: '',
        highlighted: 'home',
        redirect: false
    }

    handleChange(e) {
        this.setState({
            input_text: e.target.value
        })

    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            input_text: '',
            redirect: true
        })

        const [appState, setAppState] = this.props.appState
        setAppState({
            search_bar: this.state.input_text
        })

    }

    changeCurrentPage(e, page) {
        this.setState({
            highlighted: page
        })
    }

    showSearchBar(e) {
        let element = document.querySelector('.search-bar input');
        element.style.width = "490px";
        element.style.padding = "0 0 0 .6em";

    }

    render() {
        const [appState, setAppState] = this.props.appState
        if (this.state.redirect) {
            this.setState({
                redirect: false
            })
            return (
                <>
                    <Redirect to="/"></Redirect>
                </>
            )
        }
        return (
            <>
                <nav id="default-navbar">
                    <div className="navbar-links">
                        <NavbarItem to="/"
                            func={(e, page) => this.changeCurrentPage(e, page)}
                            name='home'
                            highlighted={this.state.highlighted}
                            text="Início" />

                        {/* <NavbarItem to="/"
                            func={(e, page) => this.changeCurrentPage(e, page)}
                            name='product'
                            highlighted={this.state.highlighted}
                            text="Produtos" /> */}

                        <NavbarItem to="/about"
                            func={(e, page) => this.changeCurrentPage(e, page)}
                            name='about'
                            highlighted={this.state.highlighted}
                            text="Sobre nós" />

                        <NavbarItem to="/contact"
                            func={(e, page) => this.changeCurrentPage(e, page)}
                            name='contact'
                            highlighted={this.state.highlighted}
                            text="Contato" />
                    </div>
                    <div className="search-bar-container">
                        <form className="search-bar" onSubmit={e => this.handleSubmit(e)}>
                            <input
                                onChange={e => this.handleChange(e)}
                                placeholder="O que você está procurando?"
                                value={this.state.input_text}>
                            </input>
                            <button type="button" onClick={(e) => this.showSearchBar(e)}>
                                <img className="icon" src="/images/search-icon.svg" alt="search-icon" />
                            </button>
                        </form>
                    </div>
                </nav>
            </>
        )
    }
}


export { Navbar, NavbarItem }
