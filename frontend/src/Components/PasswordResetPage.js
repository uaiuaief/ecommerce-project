import { Component } from "react"
import { Redirect } from "react-router-dom"

class PasswordResetPage extends Component {
    state = {
        email: '',
        redirect: null,
    }

    componentDidMount() {
        document.querySelector('body').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    handleSubmit(e) {
        e.preventDefault();

        fetch("http://127.0.0.1:8000/reset-password/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `email=${this.state.email}`
        }).then(res => res.json().then(data => {
            if (res.status === 200) {
                this.setState({
                    redirect: true
                })
            }
            else {
                let element = document.getElementById("login-error");
                element.style.display = "flex";
            }
        }))
    }

    hideError(e) {
        let element = document.getElementById("login-error");
        element.style.display = "none";
    }

    render() {
        return (
            this.state.redirect
                ?
                <Redirect to={{
                    pathname:"/login",
                    state: {
                        flash_message: "Um e-mail foi enviado para a troca de senha.",
                        flash_message_type: 'success',
                    }

                }} />
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
                        <h1>Esqueceu a senha?</h1>
                        <div id="login-error" style={{ padding: "1em 1.5em" }}>
                            Esse e-mail não pertence a uma conta.
                            <button onClick={(e) => this.hideError(e)}>
                                <img src="/images/close.svg" alt="close-icon"/>
                            </button>
                        </div>
                        <form onSubmit={e => this.handleSubmit(e)} method="POST">
                            <div className="input-block">
                                <span className="label-line">
                                    <label htmlFor="email">E-mail</label>
                                </span>
                                <input onChange={e => this.setState({ email: e.target.value })}
                                    required
                                    type="email"
                                    id="email"
                                    value={this.state.email}></input>
                            </div>
                            <button className="primary-button" type="submit">Enviar e-mail para trocar senha</button>
                        </form>
                    </div>
                </section>
        )
    }

}


export { PasswordResetPage }
