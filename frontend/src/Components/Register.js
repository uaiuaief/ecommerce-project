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
        document.querySelector('.register-page').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    handleSubmit(e) {
        e.preventDefault();
        let element = document.querySelector('.password-errors')
        if(!this.passwordsMatch()) {
            element.innerHTML = 'passwords must match'
            return
        }
        element.innerHTML = ''
        fetch("http://localhost:8000/register/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `username=${this.state.username}&email=${this.state.email}&password=${this.state.password}`
        }).then(res => res.json().then(data => {
            console.log(data);
        }))

        this.setState({
            redirect: '/login'
        })
    }

    passwordsMatch(){
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
                        <input onChange={e => this.setState({ username: e.target.value })}
                            placeholder="Usuário"
                            required
                            maxLength="40"
                            value={this.state.username}></input>
                        <input onChange={e => this.setState({ email: e.target.value })}
                            name='email'
                            placeholder="E-mail"
                            required
                            type="email"
                            value={this.state.email}></input>
                        <input onChange={e => this.setState({ password: e.target.value })}
                            name='password'
                            type='password'
                            placeholder="Senha"
                            required
                            minLength="8"
                            value={this.state.password}></input>
                        <input onChange={e => this.setState({ confirm_password: e.target.value })}
                            name='confirm_password'
                            type='password'
                            placeholder="Confirme a Senha"
                            required
                            minLength="8"
                            value={this.state.confirm_password}></input>
                        <small className="password-errors"></small>
                        <Link to="/login">Já é cadastrado? Faça seu login aqui</Link>
                        <button type="submit">Cadastrar</button>
                    </form>
                </div>
                {this.state.redirect ? <Redirect to='/login'></Redirect> : ''}
            </section>
        )
    }

}


export { Register }
