import { Component } from "react"

class Product extends Component {
    addButton(e) {
        const {...product} = this.props
        this.props.addToCart(product)
    }

    render() {
        return (
            <div className="product">
                <div className="overlay">
                    {/* <h1>Produto {this.props.preço}</h1> */}
                    <h1>Adicionar ao Carrinho</h1>
                    <img src="images/shopping-cart-icon.svg"/>
                </div>
                <div className="image-wrapper">
                    <img src={this.props.image} />
                </div>
                <div className="product-info">
                    <p className="product-title">{this.props.name}</p>
                    <p className="product-price price">R$ {this.props.price},00</p>
                </div>
                {/* <button onClick={e => this.addButton(e)}>Adicionar</button> */}
            </div>
        )
    }

}


export { Product }
