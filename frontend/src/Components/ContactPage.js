import { Component } from "react";
import { Link } from "react-router-dom";


class ContactPage extends Component {
    state = {
        name: '',
        email: '',
        subject: '',
        message: '',
    }

    clearForm() {
        this.setState({
            name: '',
            email: '',
            subject: '',
            message: '',
        })
        document.getElementById('contact-form').reset();

    }

    async handleSubmit(e) {
        const [appState, setAppState] = this.props.appState
        e.preventDefault();

        let form_data = new FormData();
        form_data.append('name', this.state.name);
        form_data.append('email', this.state.email);
        form_data.append('subject', this.state.subject);
        form_data.append('message', this.state.message);

        let url = `${window.ROOT_URL}/send_message/`;
        let res = await fetch(url, {
            method: 'POST',
            body: form_data
        })

        if (res.status === 201) {
            console.log('success');
            setAppState({
                flash_message: 'Mensagem enviada com sucesso',
                flash_message_type: 'success'
            })

            this.clearForm();
        }
        else {
            setAppState({
                flash_message: 'Não foi possível enviar a sua mensagem, tente novamente mais tarde',
                flash_message_type: 'error'
            })

            this.clearForm();
        }



    }

    componentWillUnmount() {
        const [appState, setAppState] = this.props.appState
        setAppState({
            flash_message: '',
            flash_message_type: ''
        })

    }

    componentDidMount() {
        // document.querySelector('.contact-container').scrollIntoView({ behavior: 'smooth', block: 'end' });
        document.querySelector('body').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    render() {
        return (
            <section className="contact">
                <div className="contact-container">
                    <form id="contact-form" onSubmit={e => this.handleSubmit(e)}>
                        <h1 className="form-title">Envie a sua mensagem</h1>
                        <label className="required">Seu Nome</label>
                        <input required
                            value={this.state.name}
                            maxLength='120'
                            onChange={e => this.setState({ name: e.target.value })}>
                        </input>
                        <label className="required">Seu Email</label>
                        <input required
                            type='email'
                            value={this.state.email}
                            maxLength='120'
                            onChange={e => this.setState({ email: e.target.value })}>
                        </input>
                        <label className="required">Assunto</label>
                        <input required
                            value={this.state.subject}
                            maxLength='120'
                            onChange={e => this.setState({ subject: e.target.value })}>
                        </input>
                        <label className="required">Mensagem</label>
                        <textarea
                            value={this.state.message}
                            required
                            spellCheck="false"
                            onChange={e => this.setState({ message: e.target.value })}>
                        </textarea>
                        <button className="secondary-button" type="submit">Enviar</button>
                    </form >
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
                </div >
            </section >
        )
    }

}


export { ContactPage }

