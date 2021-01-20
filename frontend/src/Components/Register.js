import { Component } from "react"
import { Link, Redirect } from "react-router-dom"

class Register extends Component {
    state = {
        email: '',
        username: '',
        password: '',
        confirm_password: '',
        redirect: ''
    }

    componentDidMount() {
        // document.querySelector('.register-page').scrollIntoView({ behavior: 'smooth', block: 'center' });
        document.querySelector('body').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    componentWillUnmount(){
        const [appState, setAppState] = this.props.appState;

        setAppState({
            flash_message: '',
            flash_message_type: '',
        })
    }

    handleSubmit(e) {
        const [appState, setAppState] = this.props.appState;

        e.preventDefault();
        let element = document.querySelector('.password-errors')
        if (!this.passwordsMatch()) {
            element.innerHTML = 'As senhas precisam ser iguais'
            return
        }
        element.innerHTML = ''
        fetch("http://localhost:8000/register/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `username=${this.state.username}&email=${this.state.email}&password=${this.state.password}`
        }).then(res => {
            let response_status_type = res.status.toString().charAt(0);
            if (response_status_type === '2') {
                this.setState({
                    redirect: '/login'
                })
            }
            else {
                setAppState({
                    flash_message: "Já existe um usuário com esse nome ou email",
                    flash_message_type: "error"
                })                
            }
            
        })

        // this.setState({
            // redirect: '/login'
        // })
    }

    passwordsMatch() {
        return (this.state.password === this.state.confirm_password)
    }

    render() {
        return (
            <section
                className="register-page"
                style={{
                    backgroundImage: "url(/images/login-background.jpg)",
                    backgroundSize: "100%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "30%",
                }}
            >
                <div className="register-area">
                    <h1>Cadastre-se</h1>
                    <form onSubmit={e => this.handleSubmit(e)}>
                        <div className="input-block">
                            <span className="label-line">
                                <label className="required">Usuário</label>
                            </span>
                            <input onChange={e => this.setState({ username: e.target.value })}
                                required
                                maxLength="40"
                                value={this.state.username}></input>
                        </div>
                        <div className="input-block">
                            <span className="label-line">
                                <label className="required">E-mail</label>
                            </span>
                            <input onChange={e => this.setState({ email: e.target.value })}
                                name='email'
                                required
                                type="email"
                                value={this.state.email}></input>
                        </div>
                        <div className="input-block">
                            <span className="label-line">
                                <label className="required">Senha</label>
                            </span>
                            <input onChange={e => this.setState({ password: e.target.value })}
                                name='password'
                                type='password'
                                required
                                minLength="8"
                                value={this.state.password}></input>
                        </div>
                        <div className="input-block">
                            <span className="label-line">
                                <label className="required">Confirme a senha</label>
                            </span>
                            <input onChange={e => this.setState({ confirm_password: e.target.value })}
                                name='confirm_password'
                                type='password'
                                required
                                minLength="8"
                                value={this.state.confirm_password}></input>
                            <div className="password-errors"></div>
                        </div>
                        <button type="submit">Cadastrar</button>
                    </form>
                    <div className="login-area-footer">
                        Já é cadastrado?
                        <Link to="/login"> Faça o login</Link>
                    </div>
                </div>
                {/* {this.state.redirect ? <Redirect to='/login'></Redirect> : ''} */}
                {this.state.redirect ? <Redirect to={{
                    pathname: '/login',
                    state: {

                        flash_message: "Seu cadastro foi realizado com sucesso.",
                        flash_message_type: 'success',
                    }
                }}>
                </Redirect> : ''}
            </section>
        )
    }

}


export { Register }
