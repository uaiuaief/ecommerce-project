import { Component } from "react"

class Product extends Component {
    addButton(e) {
        const { ...product } = this.props
        this.props.addToCart(product)
    }

    render() {
        return (
            <div className="product">
                <div className="overlay">
                    <h1>Ver Produto</h1>
                </div>
                <div className="image-wrapper">
                    <img src={this.props.image} alt="product" loading="lazy" />
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

class ProductSkeleton extends Component {
    render() {
        return (
            <div className="product-skeleton product">
                <div className="image-wrapper">
                    <div className="image-skeleton">

                    </div>
                </div>
                <div className="product-info">
                    <p className="product-title"></p>
                    <p className="product-price price"></p>
                </div>
            </div>
        )
    }
}


export { Product, ProductSkeleton }
