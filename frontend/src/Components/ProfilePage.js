import { Component } from "react";


class UserProfileForm extends Component {
    render() {

        return (
            <div>
                <form name="user-profile" className="user-profile-form">
                    <div>
                        <label htmlFor="nome">Nome completo</label>
                        <input id="nome"
                            required
                            pattern="^\s*([A-Za-z]{1,}([\.,] |[-']| ))+[A-Za-z]+\.?\s*$"></input>
                    </div>
                    <div>
                        <label htmlFor="sexo">Sexo</label>
                        <select id="sexo" type="selection">
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
    state = {
        cep: '',
        address: '',
        house_number: '',
        state: '',
        city: '',
        district: '',
        reference: '',
        complement: '',
    }

    async searchCode() {
        let match = /\d{5}-\d{3}/.test(this.state.cep);
        if (!match) return;

        // const URL = `https://ws.apicep.com/cep/${this.state.cep}.json`
        const URL = `https://viacep.com.br/ws/${this.state.cep}/json/`

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
            alert("CEP não encontrado")
        }
        // console.log(data);

    }

    async submitAddressForm(e) {
        e.preventDefault();
        const token = localStorage.getItem("Token");
        console.log(token);
        const user_id = localStorage.getItem("user_id");
        let URL = `http://localhost:8000/users/${user_id}/`;
        let res = await fetch(URL, {headers: {'Authorization': `Token ${token}`}});
        let data = await res.json();
        URL = data.profile
                
        let body = ""
        body += `state=${this.state.state}`
        body += `&cep=${this.state.cep}`
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
            console.log(res);
        }))
    }


    render() {
        return (
            <div>
                <form onSubmit={e => this.submitAddressForm(e)} name="address" className="change-address-form">
                    <div className="small-input">
                        <label htmlFor="cep">Insira o CEP</label>
                        <input id="cep"
                            onChange={e => this.setState({ cep: e.target.value })}
                            maxLength="9"
                            pattern="\d{5}-\d{3}"
                            placeholder="00000-000">
                        </input>
                        <button onClick={() => this.searchCode()} type="button">Consultar meu CEP</button>
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
                                onChange={e => this.setState({ house_number: e.target.value })}
                                required >
                            </input>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="complemento">Complemento</label>
                        <input id="complemento"
                            onChange={e => this.setState({ complement: e.target.value })}
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
                    <button type="submit">Salvar alterações</button>
                </form>
            </div>
        )
    }
}


class ChangeEmailForm extends Component {
    render() {
        return (
            <div>
                <form>
                    <div>
                        <label htmlFor="current-email">E-mail atual</label>
                        <input id="current-email" type="email" placeholder=""></input>
                    </div>
                    <div>
                        <label htmlFor="new-email">Novo e-mail</label>
                        <input id="new-email" type="email" placeholder=""></input>
                    </div>
                    <div>
                        <label htmlFor="confirm-new-email">Confirme o novo e-mail</label>
                        <input id="confirm-new-email" type="email" placeholder=""></input>
                    </div>
                    <button type="submit">Salvar Alterações</button>
                </form>
            </div>
        )
    }
}



class ProfilePage extends Component {
    state = {
        form: 'address',
    }

    renderForm() {
        switch (this.state.form) {
            case 'user':
                return (
                    <UserProfileForm />
                )

            case 'address':
                return (
                    <ChangeAddressForm />
                )

            case 'password':
                return (
                    <ChangePasswordForm />
                )

            case 'email':
                return (
                    <ChangeEmailForm />
                )
            default:
                break;
        }
    }


    render() {
        return (
            <section className="profile-page">
                <h1>Profile Page</h1>
                <h1>{localStorage.getItem('username')}</h1>
                <div className="profile-tabs">
                    <button
                        className={this.state.form === 'user' ? "highlighted-tab" : ""}
                        onClick={e => this.setState({ form: 'user' })}>Dados Pessoais</button>
                    <button
                        className={this.state.form === 'address' ? "highlighted-tab" : ""}
                        onClick={e => this.setState({ form: 'address' })}>Alterar Endereço</button>
                    <button
                        className={this.state.form === 'password' ? "highlighted-tab" : ""}
                        onClick={e => this.setState({ form: 'password' })}>Alterar Senha</button>
                    <button
                        className={this.state.form === 'email' ? "highlighted-tab" : ""}
                        onClick={e => this.setState({ form: 'email' })}>Alterar E-mail</button>
                </div>
                {this.renderForm()}
            </section>
        )
    }

}


export { ProfilePage }

