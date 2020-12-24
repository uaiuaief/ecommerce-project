import { Component } from "react"


class CartItem extends Component {
    constructor(props) {
        super(props)
        const { product } = props
        this.state = {
            decrease_button_disabled: product.amount === 1 ? true : false
        }

    }

    removeProduct(e, item) {
        const [appState, setAppState] = this.props.appState;

        setAppState({
            cart_items: [...appState.cart_items.filter((each) => each != item)],
            cart_amount: appState.cart_amount - item.amount
        })

    }

    decrease() {
        const [appState, setAppState] = this.props.appState;
        const { product } = this.props
        if (product.amount === 1) return

        if (product.amount === 2) {
            this.setState({
                decrease_button_disabled: true
            })
        }

        const { cart_items } = appState

        let newcart = [...cart_items];
        let index = newcart.indexOf(product);
        newcart[index].amount -= 1

        setAppState({
            cart_items: [...newcart],
            cart_amount: appState.cart_amount - 1
        })

    }

    increase() {
        this.props.addToCart(this.props.product)
        this.setState({
            decrease_button_disabled: false
        })
    }

    render() {
        const { product } = this.props
        return (
            <div className="item flex">
                <div className="flex ">
                    <div className="cart-image-wrapper">
                        <img src={product.image} alt='' />
                        <button className="remove-product-button"
                            onClick={(e) => this.removeProduct(e, product)}>Remover Produto</button>
                    </div>
                    <div className="item-description">
                        <h1 className="item-title">
                            {product.name}
                        </h1>
                        <p>
                            {product.description}
                        </p>

                        R$ {product.price / 100},00
                    </div>
                </div>
                <div className="cart-controls-container">
                    <div className="light-container">
                        Quantidade
                    </div>
                    <div className="cart-item-controls flex">
                        {this.state.decrease_button_disabled
                            ?
                            <button className="decrease button button-disabled" onClick={() => this.decrease()}>-</button>
                            :
                            <button className="decrease button control-button" onClick={() => this.decrease()}>-</button>
                        }
                        <p className="info-text">{this.props.product.amount}</p>
                        <button className="increase control-button button" onClick={() => this.increase()}>+</button>
                    </div>
                    <small>Unidades</small>
                </div>
                <div className="price-container">
                    <div className="light-container">
                        Total
                    </div>
                    <div className="price">
                        R$ {product.price * product.amount / 100},00
                    </div>
                </div>
            </div>
        )
    }
}

class ShoppingCartPage extends Component {

    emptyCart(e) {
        const [appState, setAppState] = this.props.appState
        setAppState({
            cart_items: [],
            cart_amount: 0
        })

    }

    render() {
        const [appState, setAppState] = this.props.appState
        const cart_items = appState.cart_items

        return (
            <div className="shopping-cart-section">
                <h1 className="page-title">Produtos adicionados ao carrinho</h1>
                <div className="cart-items" >
                    {cart_items.map(item => {
                        return (
                            <CartItem
                                addToCart={this.props.addToCart}
                                product={item}
                                appState={this.props.appState} />

                        )
                    })
                    }

                    <button onClick={e => this.emptyCart(e)}>Esvaziar Carrinho</button>
                    <button>Finalizar Compra</button>
                </div>
            </div>
        )
    }

}


export { ShoppingCartPage }
