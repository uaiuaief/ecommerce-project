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
        this.props.addToCart(this.props.product, true)
        this.setState({
            decrease_button_disabled: false
        })
    }

    render() {
        const { product } = this.props;
        let last = this.props.last_added_item;
        return (
            <div id={`item-${this.props.listID}`}
                className={last ? "last-added-item item" : "item"}>
                <div className="item-detail">
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
    state = {
        purchase_submited: false
    }

    emptyCart(e) {
        let element = document.querySelector('.cart-items')
        if (!element) return
        element.classList.add('removed');

        element.addEventListener("animationend", () => {
            const [appState, setAppState] = this.props.appState
            console.log('123');
            setAppState({
                cart_items: [],
                cart_amount: 0
            })

        })
    }

    getCartItems() {
        const [appState, setAppState] = this.props.appState
        const cart_items = appState.cart_items

        if (appState.last_added_item) {
            cart_items.sort((a, b) => {
                if (b.id == appState.last_added_item.id) {
                    return 1
                }
                else {
                    return 0
                }
            })
        }

        let items = cart_items.map(item => {
            let last_added_item = appState.last_added_item ? appState.last_added_item.id == item.id : false;
            return (
                <CartItem
                    last_added_item={last_added_item}
                    key={item.id}
                    listID={item.id}
                    addToCart={this.props.addToCart}
                    product={item}
                    appState={this.props.appState} />

            )
        })

        return items;
    }


    render() {
        // console.log(this.props);
        const [appState, setAppState] = this.props.appState
        const cart_items = appState.cart_items

        let total_price = cart_items.length
            ? cart_items.map(item => item.price * item.amount / 100).reduce((a, b) => a + b)
            : 0;

        return (
            <div className="shopping-cart-section">
                {cart_items.length
                    ?
                    <>
                        <div className="heading">
                            <h1 className="page-title">Produtos adicionados ao carrinho</h1>
                            <button className="muted-button"
                                onClick={e => this.emptyCart(e)}>Esvaziar Carrinho</button>
                        </div>
                        <div className="cart-items" >
                            {this.getCartItems()}
                        </div>
                        <div className="purchase-summary">
                            <p> Total dos produtos: R$ {total_price},00 </p>
                            <div className="buttons" >

                                <Link
                                    className="muted-button-2"
                                    to='/'>Continuar Comprando</Link>

                                {localStorage.getItem('user_id')
                                    ?
                                    <>
                                        {/* <Link to={`/profile/${localStorage.getItem('user_id')}`}>Finalizar compra</Link> */}
                                        <Link className="primary-button"
                                            target="blank"
                                            to='/purchase_orders/1'>
                                                Finalizar Compra
                                        </Link>
                                    </>
                                    :
                                    <>
                                        <Link className="primary-button" to={{
                                            pathname: "/login",
                                            // state: { next_page: `/profile/` }
                                            state: {
                                                flash_message: "Faça login para finalizar a compra",
                                                flash_message_type: 'warning',
                                                next_page: `/shopping-cart`
                                            }
                                        }}> Finalizar Compra </Link>
                                    </>

                                }
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className="empty-cart">
                            <h1> Seu carrinho está vazio!</h1>
                            <Link className="primary-button" to="/">Ver mais produtos</Link>
                        </div>
                    </>
                }
            </div >
        )
    }

}


export { ShoppingCartPage }
