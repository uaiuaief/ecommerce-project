import { Component } from "react"
import { Link, Redirect } from "react-router-dom";


class CartItem extends Component {
    constructor(props) {
        super(props)
        const { product } = props
        this.state = {
            decrease_button_disabled: product.amount === 1 ? true : false
        }

    }

    removeProduct(e, item) {
        let element = document.getElementById(`item-${this.props.listID}`)
        element.classList.add('removed');

        element.addEventListener("animationend", () => {
            const [appState, setAppState] = this.props.appState;

            setAppState({
                cart_items: [...appState.cart_items.filter((each) => each != item)],
                cart_amount: appState.cart_amount - item.amount
            })
        })

        // const [appState, setAppState] = this.props.appState;

        // setAppState({
        //     cart_items: [...appState.cart_items.filter((each) => each != item)],
        //     cart_amount: appState.cart_amount - item.amount
        // })

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
            <div className="item" id={`item-${this.props.listID}`}>
                <div className="flex ">
                    <div className="cart-image-wrapper">
                        <img src={product.image} alt='' />
                        {/* <button className="remove-product-button"
                            onClick={(e) => this.removeProduct(e, product)}>Remover Produto</button> */}
                    </div>
                    <div className="item-description">
                        <h1 className="item-title">
                            {product.name}
                        </h1>
                        <p>
                            {product.description}
                        </p>
                        <p>
                            {/* R$ {product.price / 100},00 */}
                        </p>

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
                    <div>
                        <button className="remove-product-button"
                            onClick={(e) => this.removeProduct(e, product)}>Remover Produto</button>
                    </div>
                </div>
                <div className="price-container">
                    <div className="">
                        Total:
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

        let total_price = cart_items.length
            ? cart_items.map(item => item.price * item.amount / 100).reduce((a, b) => a + b)
            : 0;

        return (
            <div className="shopping-cart-section">
                <h1 className="page-title">Produtos adicionados ao carrinho</h1>

                {cart_items.length
                    ?
                    <>
                        <div className="cart-items" >
                            {cart_items.reverse().map(item => {
                                return (
                                    <CartItem
                                        key={item.id}
                                        listID={item.id}
                                        addToCart={this.props.addToCart}
                                        product={item}
                                        appState={this.props.appState} />

                                )
                            })
                            }

                        </div>
                        <div style={{ fontSize: "2em", padding: "1em 1em" }}>
                            Total dos produtos: R$ {total_price},00
                        </div>
                        <button onClick={e => this.emptyCart(e)}>Esvaziar Carrinho</button>
                        {localStorage.getItem('user_id')
                            ?
                            <>
                                {/* <Link to={`/profile/${localStorage.getItem('user_id')}`}>Finalizar compra</Link> */}
                                <Link className="main-button" to='/purchase_orders/1'>Finalizar compra</Link>
                            </>
                            :
                            <>
                                <Link className="main-button" to={{
                                    pathname: "/login",
                                    // state: { next_page: `/profile/` }
                                    state: { next_page: `/shopping-cart` }
                                }}>
                                    Finalizar compra</Link>
                            </>
                        }
                        {/* <button onClick={e => this.finishBuying(e)}>Finalizar Compra</button> */}
                    </>
                    :
                    <>
                        <div style={{ height: "300px", marginTop: "3em" }}>
                            <h1> Seu carrinho está vazio </h1>
                            <Link to="/">Ir para produtos</Link>
                        </div>
                    </>
                }
            </div >
        )
    }

}


export { ShoppingCartPage }
