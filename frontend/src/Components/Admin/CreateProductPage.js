import { Component } from "react"


class CreateProductPage extends Component {
    state = {
        name: '',
        description: '',
        price: '',
        image: null,
    }

    handleSubmit(e) {
        const { name, description, price, image } = this.state
        e.preventDefault();

        let data = new FormData();
        data.append('name', name);
        data.append('description', description);
        data.append('price', price);
        data.append('image', image);

        fetch("http://127.0.0.1:8000/products/", {
            method: 'POST',
            headers: {
                // 'Content-Type': 'multipart/form-data;boundary=&',
                // 'Authorization': "Token ef6ff0a33959d98fcb27c7efe82f349e8da13854"
            },
            // body: `name=${name}&description=${description}&price=${price}&image=${image}`
            body: data
        }).then(res => res.json().then(data => {
            console.log(data);
            //window.location.replace('http://localhost:8000/login/');

        }))
    }

    render() {
        console.log(this.state);
        return (
            <div style={{ backgroundColor: "#fff", padding: "5em 0" }}>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div>
                        <label>Nome</label>
                        <input required
                            onChange={e => this.setState({ name: e.target.value })}></input>
                    </div>
                    <div>
                        <label>Descrição</label>
                        <textarea onChange={e => this.setState({ description: e.target.value })}>
                        </textarea>
                    </div>
                    <div>
                        <label>Preço</label>
                        <input type="number"
                            min='0'
                            step='0.01'
                            placeholder="Ex: 50.00"
                            required
                            onChange={e => this.setState({ price: e.target.value })}></input>
                    </div>
                    <div>
                        <label>Imagem</label>
                        <input type="file" accept="image/*" required
                            onChange={e => this.setState({ image: e.target.files[0] })}></input>
                    </div>

                    <button type="submit">Criar</button>
                </form >
            </div >
        )
    }
}

export { CreateProductPage }