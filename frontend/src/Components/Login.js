import { Component } from "react"
import { Link, Redirect } from "react-router-dom"

class Login extends Component {
    state = {
        username: '',
        password: '',
        redirect: null,
    }

    componentDidMount() {
        if (this.props.logged_in) {
            console.log(this.props.logged_in);
            this.setState({
                redirect: '/'
            })
        }
        // document.querySelector('.login-page').scrollIntoView({ behavior: 'smooth', block: 'center' });


        let location = this.props.location
        let flash_message = location.state ? location.state.flash_message : '';
        let flash_message_type = location.state ? location.state.flash_message_type : '';

        this.props.setAppState({
            flash_message: flash_message,
            flash_message_type: flash_message_type
        })

        if (flash_message) {
            let element = document.getElementById('username');

        }

        document.querySelector('body').scrollIntoView({ behavior: 'smooth', block: 'start' });

    }

    componentWillUnmount() {
        let location = this.props.location
        let flash_message = location.state ? location.state.flash_message : '';

        if (flash_message) {
            this.props.setAppState({
                flash_message: '',
                flash_message_type: '',
            })

        }

    }

    hideError(e) {
        let element = document.getElementById("login-error");
        element.style.display = "none";
    }

    getRedirect() {
        const location = this.props.location;
        // let redirect = location.state ? location.state.next_page + data.user_id : '/';
        try {
            let redirect = location.state.next_page ? location.state.next_page : '/'
            return redirect;
        } catch (TypeError) {
            return '/';
        }

    }

    handleSubmit(e) {
        e.preventDefault();
        fetch("http://127.0.0.1:8000/api-token-auth/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': "SameSite=None",
            },
            body: `username=${this.state.username}&password=${this.state.password}`
        }).then(res => res.json().then(data => {
            if (data.token) {
                localStorage.setItem('Token', data.token)
                localStorage.setItem('username', data.username)
                localStorage.setItem('user_id', data.user_id)

                let redirect = this.getRedirect();

                this.setState({
                    redirect: redirect,
                    // redirect: next_page ? next_page : '/'
                })
                this.props.setAppState({ logged_in: true })
            }
            else {
                let element = document.getElementById("login-error");
                element.style.display = "flex";
            }
        }))
    }


    render() {
        return (
            this.state.redirect
                ?
                <Redirect to={this.state.redirect} />
                :
                <section className="login-page"
                    style={{
                        backgroundImage: "url(/images/about-background.jpg)",
                        backgroundSize: "100%",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "30%",
                    }}
                >
                    <div className="login-area">
                        <h1>Fazer Login</h1>
                        <div id="login-error">
                            Usuário ou senha incorretos.
                            <button onClick={(e) => this.hideError(e)}>
                                <img src="/images/close.svg" />
                            </button>
                        </div>
                        <form onSubmit={e => this.handleSubmit(e)} method="POST" action="http://127.0.0.1:8000/login/">
                            <div className="input-block">
                                <span className="label-line">
                                    <label htmlFor="username">Usuário</label>
                                </span>
                                <input onChange={e => this.setState({ username: e.target.value })}
                                    required
                                    id="username"
                                    value={this.state.username}></input>
                            </div>
                            <div className="input-block">
                                <span className="label-line">
                                    <label htmlFor="password">Senha</label>
                                    <Link to="/password-reset"> Esqueceu a senha? </Link>
                                </span>
                            <input onChange={e => this.setState({ password: e.target.value })}
                                id='password'
                                required
                                type='password'
                                value={this.state.password}></input>
                            </div>
                        <button className="primary-button" type="submit">Entrar</button>
                        </form>
                    <div className="login-area-footer">
                        Não é cadastrado?
                            <Link to="/register"> Crie a sua conta</Link>
                    </div>
                    </div>
                </section >
        )
    }

}


export { Login }
