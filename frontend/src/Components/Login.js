import { Component } from "react"
import { Link, Redirect } from "react-router-dom"

class Login extends Component {
    state = {
        email: '',
        password: '',
        redirect: null
    }

    componentDidMount() {
        if (this.props.logged_in) {
            console.log(this.props.logged_in);
            this.setState({
                redirect: '/'
            })
        }
        document.querySelector('.login-page').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    handleSubmit(e) {
        e.preventDefault();
        fetch("http://127.0.0.1:8000/api-token-auth/", {
            method: 'POST',
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': "SameSite=None",
            },
            // body: `csrfmiddlewaretoken=${cookie}&email=${this.state.email}&password=${this.state.password}`
            // body: `csrfmiddlewaretoken=koDi8M7AEYaSCjXkp3NTJD3HGDx8DMg0yvtcXseuVKU1sQWr49Ket5JG1HDfip9a&email=${this.state.email}&password=${this.state.password}&sessionid=gmdz6848cgheuycexab5sho7lku6chro`
            body: `username=${this.state.email}&password=${this.state.password}`
        }).then(res => res.json().then(data => {
            if (data.token) {
                console.log(data.token);
                localStorage.setItem('Token', data.token)
                localStorage.setItem('username', data.username)
                localStorage.setItem('user_id', data.user_id)
                this.setState({
                    redirect: '/'
                })
                this.props.setAppState({ logged_in: true })
            }
            else {
                console.log('invalid credentials');
            }
            //window.location.replace('http://localhost:8000/login/');

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
                        <form onSubmit={e => this.handleSubmit(e)} method="POST" action="http://127.0.0.1:8000/login/">
                            <input onChange={e => this.setState({ email: e.target.value })}
                                name='email'
                                placeholder="E-mail ou Usuário"
                                value={this.state.email}></input>
                            <input onChange={e => this.setState({ password: e.target.value })}
                                name='password'
                                type='password'
                                placeholder="Senha"
                                value={this.state.password}></input>
                            <a href="#">Esqueceu a senha?</a>
                            <button type="submit">Entrar</button>
                            <Link to="/register">Não é cadastrado? Cadastre-se aqui</Link>
                        </form>
                    </div>
                </section>
        )
    }

}


export { Login }
