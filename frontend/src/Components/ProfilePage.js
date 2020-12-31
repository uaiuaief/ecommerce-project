import { Component } from "react";
import { Link } from "react-router-dom";


class UserProfileForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...props.form_data };
    }

    async submitUserProfileForm(e) {
        e.preventDefault();
        const token = localStorage.getItem("Token");
        let URL = this.props.profile_url

        let body = ""
        body += `full_name=${this.state.full_name}`
        body += `&gender=${this.state.gender}`

        fetch(URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Token ${token}`
            },
            body: body
        }).then(res => res.json().then(data => {
            console.log(res);
            this.props.fetchData()
            let response_status_type = res.status.toString().charAt(0);
            if (response_status_type == '2') {
                alert('Seus dados foram atualizados com sucesso')
            }
        }))
    }


    render() {
        return (
            <div>
                <form onSubmit={e => this.submitUserProfileForm(e)}
                    name="user-profile"
                    className="user-profile-form">
                    <div>
                        <label htmlFor="nome">Nome completo</label>
                        <input id="nome"
                            onChange={e => this.setState({ full_name: e.target.value })}
                            maxLength="60"
                            value={this.state.full_name}
                            required ></input>
                    </div>
                    <div>
                        <label htmlFor="sexo">Sexo</label>
                        <select onChange={e => this.setState({ gender: e.target.value })}
                            value={this.state.gender}
                            required
                            id="sexo"
                            type="selection">
                            <option>Masculino</option>
                            <option>Feminino</option>
                        </select>
                    </div>
                    <button type="submit">Salvar Alterações</button>
                </form>
            </div>
        )
    }
}


class ChangeAddressForm extends Component {
    constructor(props) {
        super(props);
        this.state = props.form_data;
    }

    async searchCode() {
        let match = /\d{5}-\d{3}/.test(this.state.zip_code);
        if (!match) {
            alert('Digite o CEP corretamente')
            return
        }

        // const URL = `https://ws.apicep.com/cep/${this.state.cep}.json`
        const URL = `https://viacep.com.br/ws/${this.state.zip_code}/json/`

        let res = await fetch(URL);
        let data = await res.json();

        if (!data.erro) {
            this.setState({
                state: data.uf,
                city: data.localidade,
                district: data.bairro,
                address: data.logradouro,
            })
        }
        else {
            alert('CEP não encontrado')
        }

    }

    async submitAddressForm(e) {
        e.preventDefault();
        const token = localStorage.getItem("Token");
        let URL = this.props.profile_url;

        let body = ""
        body += `state=${this.state.state}`
        body += `&zip_code=${this.state.zip_code}`
        body += `&address=${this.state.address}`
        body += `&house_number=${this.state.house_number}`
        body += `&city=${this.state.city}`
        body += `&district=${this.state.district}`
        body += `&reference=${this.state.reference}`
        body += `&complement=${this.state.complement}`

        fetch(URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Token ${token}`
            },
            body: body
        }).then(res => res.json().then(data => {
            this.props.fetchData('address')
            alert('Seus dados foram atualizados com sucesso')
        }))
    }


    render() {
        return (
            <div>
                <form onSubmit={e => this.submitAddressForm(e)} name="address" className="change-address-form">
                    <div className="small-input">
                        <label htmlFor="cep">Insira o CEP</label>
                        <input id="cep"
                            onChange={e => this.setState({ zip_code: e.target.value })}
                            maxLength="9"
                            pattern="\d{5}-\d{3}"
                            value={this.state.zip_code}
                            placeholder="00000-000">
                        </input>
                        <button onClick={(e) => this.searchCode(e)} type="button">Consultar meu CEP</button>
                    </div>

                    <div className="field-group">
                        <div>
                            <label htmlFor="endereço">Endereço</label>
                            <input id="endereço"
                                required
                                maxLength="120"
                                onChange={e => this.setState({ address: e.target.value })}
                                value={this.state.address}>
                            </input>
                        </div>
                        <div className="small-input">
                            <label htmlFor="número">Número</label>
                            <input id="número"
                                maxLength="20"
                                value={this.state.house_number}
                                onChange={e => this.setState({ house_number: e.target.value })}
                                required >
                            </input>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="complemento">Complemento</label>
                        <input id="complemento"
                            onChange={e => this.setState({ complement: e.target.value })}
                            value={this.state.complement}
                            maxLength="120">
                        </input>
                    </div>

                    <div className="field-group">
                        <div className="small-input">
                            <label htmlFor="bairro">Bairro</label>
                            <input id="bairro"
                                required
                                maxLength="40"
                                onChange={e => this.setState({ district: e.target.value })}
                                value={this.state.district}>
                            </input>
                        </div>
                        <div>
                            <label htmlFor="referencia">Referência</label>
                            <input id="referencia"
                                onChange={e => this.setState({ reference: e.target.value })}
                                value={this.state.reference}
                                maxLength="120">
                            </input>
                        </div>
                    </div>

                    <div className="field-group">
                        <div className="grid-small">
                            <label htmlFor="estado">Estado</label>
                            <input id="estado"
                                required
                                maxLength="40"
                                onChange={e => this.setState({ state: e.target.value.toUpperCase() })}
                                value={this.state.state}>
                            </input>
                        </div>
                        <div className="grid-large">
                            <label htmlFor="cidade">Cidade</label>
                            <input id="cidade"
                                required
                                maxLength="40"
                                onChange={e => this.setState({ city: e.target.value })}
                                value={this.state.city}>
                            </input>
                        </div>
                    </div>

                    <button type="submit">Salvar Alterações</button>
                </form>
            </div>
        )
    }
}


class ChangePasswordForm extends Component {
    render() {
        return (
            <div>
                <form>
                    <div>
                        <label htmlFor="current-password">Senha atual</label>
                        <input id="current-password" type="password" placeholder=""></input>
                    </div>
                    <div>
                        <label htmlFor="new-password">Nova senha</label>
                        <input id="new-password" type="password" placeholder=""></input>
                    </div>
                    <div>
                        <label htmlFor="confirm-new-password">Confirme a nova senha</label>
                        <input id="confirm-new-password" type="password" placeholder=""></input>
                    </div>
                    <button type="submit">Salvar Alterações</button>
                </form>
            </div>
        )
    }
}


class ChangeEmailForm extends Component {
    constructor(props) {
        super(props);
        this.state = props.form_data;
    }

    async submitEmailForm(e) {
        e.preventDefault();
        if (this.state.new_email !== this.state.confirm_email) {
            alert("Campos não são iguais")
            return
        }

        const token = localStorage.getItem("Token");
        const user_id = localStorage.getItem("user_id");
        let URL = `http://localhost:8000/users/${user_id}/`;

        let body = ""
        body += `email=${this.state.new_email}`

        fetch(URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Token ${token}`
            },
            body: body
        }).then(res => res.json().then(data => {
            this.props.fetchData('email')
            alert('Seus dados foram alterados com sucesso')
        }))
    }


    render() {
        return (
            <div>
                <form onSubmit={e => this.submitEmailForm(e)}>
                    <div>
                        <label htmlFor="current-email">E-mail atual</label>
                        <input id="current-email"
                            // onChange={e => this.setState({email: e.target.value})}
                            readOnly
                            value={this.state.email}
                            type="email"
                            placeholder=""></input>
                    </div>
                    <div>
                        <label htmlFor="new-email">Novo e-mail</label>
                        <input id="new-email"
                            onChange={e => this.setState({ new_email: e.target.value })}
                            required
                            type="email"
                            placeholder=""></input>
                    </div>
                    <div>
                        <label htmlFor="confirm-new-email">Confirme o novo e-mail</label>
                        <input id="confirm-new-email"
                            onChange={e => this.setState({ confirm_email: e.target.value })}
                            required
                            type="email"
                            placeholder=""></input>
                    </div>
                    <button type="submit">Salvar Alterações</button>
                </form>
            </div>
        )
    }
}



class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current_form: props.form ? props.form : '',

            // FORM DATA 
            user_profile_form: {
                full_name: "",
                gender: ""
            },
            email_form: {
                email: ""
            },
            address_form: {
                zip_code: "",
                address: "",
                house_number: "",
                state: "",
                city: "",
                district: "",
                reference: "",
                complement: "",
            },

        }
    }
    // state = {
    //     current_form: '',

    //     // FORM DATA 
    //     user_profile_form: {
    //         full_name: "",
    //         gender: ""
    //     },
    //     email_form: {
    //         email: ""
    //     },
    //     address_form: {
    //         zip_code: "",
    //         address: "",
    //         house_number: "",
    //         state: "",
    //         city: "",
    //         district: "",
    //         reference: "",
    //         complement: "",
    //     },
    // }

    async fetchData(current_form = 'user') {
        const token = localStorage.getItem("Token");
        const user_id = localStorage.getItem("user_id");
        let USER_URL = `http://localhost:8000/users/${user_id}/`;
        let user_res = await fetch(USER_URL, { headers: { 'Authorization': `Token ${token}` } });
        let user_data = await user_res.json();
        let { email } = user_data;

        let PROFILE_URL = user_data.profile;
        let profile_res = await fetch(PROFILE_URL, { headers: { 'Authorization': `Token ${token}` } });
        let profile_data = await profile_res.json();

        let { full_name, gender, url, user, ...full_address } = profile_data;

        this.setState({
            current_form: current_form,
            profile_url: PROFILE_URL,
            email_form: {
                email: email
            },
            user_profile_form: {
                full_name: full_name,
                gender: gender,
            },
            address_form: full_address
        })
    }

    async componentDidMount() {
        this.fetchData();
    }

    renderForm() {
        switch (this.state.current_form) {
            case 'user':
                return (
                    <UserProfileForm
                        profile_url={this.state.profile_url}
                        fetchData={(form) => this.fetchData(form)}
                        form_data={this.state.user_profile_form} />
                )

            case 'address':
                return (
                    <ChangeAddressForm
                        profile_url={this.state.profile_url}
                        fetchData={(form) => this.fetchData(form)}
                        form_data={this.state.address_form} />
                )

            case 'password':
                return (
                    <ChangePasswordForm
                        fetchData={(form) => this.fetchData(form)}
                    />
                )

            case 'email':
                return (
                    <ChangeEmailForm
                        profile_url={this.state.profile_url}
                        fetchData={(form) => this.fetchData(form)}
                        form_data={this.state.email_form} />
                )
            default:
                break;
        }
    }


    render() {
        return (
            <section className="profile-page">
                <div className="profile-container">
                    <h1>Informações Pessoais</h1>
                    <h1>{localStorage.getItem('username')}</h1>
                    <Link className="main-button secondary-color" to="/my_purchases">Minhas compras</Link>
                    <div className="profile-tabs">
                        <button
                            className={this.state.current_form === 'user' ? "highlighted-tab" : ""}
                            onClick={e => this.setState({ current_form: 'user' })}>Dados Pessoais</button>
                        <button
                            className={this.state.current_form === 'address' ? "highlighted-tab" : ""}
                            onClick={e => this.setState({ current_form: 'address' })}>Alterar Endereço</button>
                        <button
                            className={this.state.current_form === 'password' ? "highlighted-tab" : ""}
                            onClick={e => this.setState({ current_form: 'password' })}>Alterar Senha</button>
                        <button
                            className={this.state.current_form === 'email' ? "highlighted-tab" : ""}
                            onClick={e => this.setState({ current_form: 'email' })}>Alterar E-mail</button>
                    </div>
                    {this.renderForm()}
                </div>
            </section>
        )
    }

}


export { ProfilePage }

