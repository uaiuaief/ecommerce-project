import { Component } from "react"
import { Link, Redirect } from "react-router-dom"



class ProductDetail extends Component {
    state = {
        product: null
    }

    addButton(e) {
        this.props.addToCart(this.state.product)
    }

    async componentDidMount() {
        const { props } = this.props
        // document.querySelector('.image-container').scrollIntoView({ behavior: 'smooth', block: 'center' });
        let product_id = props.match.params.product_id
        let response = await fetch(`http://127.0.0.1:8000/products/${product_id}`, {
            method: 'GET',
        })

        let data = await response.json();
        if (data.url) {
            data.amount = 1
            this.setState({
                product: data
            })
            document.querySelector('.image-container').scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        else {
            this.setState({
                product: null
            })
        }

    }

    render() {
        return (
            <div className="product-detail">
                {this.state.product
                    ?
                    <>
                        <div className="image-container">
                            <img src={`${this.state.product.image}`}></img>
                        </div>
                        <div className="description">
                            <h1>{this.state.product.name}</h1>
                            <p>{this.state.product.description}</p>
                            <h2>R$ {this.state.product.price / 100},00</h2>
                            {/* <button onClick={e => this.addButton(e)}>Adicionar ao carrinho</button> */}
                            <Link to="/shopping-cart" onClick={e => this.addButton(e)}>Adicionar ao carrinho</Link>
                        </div>
                    </>
                    :
                    <div style={{ height: "600px", width: "600px" }}>
                    </div>
                }
            </div>
        )
    }
}

export { ProductDetail }