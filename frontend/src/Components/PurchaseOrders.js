import { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';



class PurchaseOrders extends Component {
    stripePromise = loadStripe('pk_test_51I3nPqAHPQv4bwqaS2vvi7WXqZ3fSqRpokIGn2EXOr99RXKwL8FuwmQlj99UhdYV1eA3sSjNHfX8NyolJGr4gb7A00hsBy6BLx')
    state = {
        purchase_orders: null,
        purchase_confirmed: false,

        loading: false,
    }

    async createPurchasingOrder() {
        let token = localStorage.getItem('Token')
        let user_id = localStorage.getItem('user_id')
        let URL = `http://localhost:8000/purchase_orders/`

        let cart_items = JSON.parse(localStorage.getItem('cart'));
        let total_price = cart_items.map(item => item.price * item.amount).reduce((a, b) => a + b);
        let item_urls = cart_items.map(item => {
            return ({
                amount: item.amount,
                url: item.url
            })
        })

        let form_data = new FormData();
        let user_url = `http://localhost:8000/users/${user_id}/`
        form_data.append('user', user_url);
        form_data.append('value', total_price);




        // Não funciona, só adiciona 1 produto  -----------------------

        item_urls.map(product => {
            for (let i = 0; i < product.amount; i++) {
                form_data.append('products', product.url)
            }
        })

        // ------------------------------------------------------------



        const [appState, setAppState] = this.props.appState

        let res = await fetch(URL, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`
            },
            body: form_data,
        })
        let data = await res.json();
        // console.log(res);
        // console.log(data.products);
        if (res.status == 201) {
            localStorage.removeItem('cart')
            localStorage.removeItem('cart_amount')
            this.setState({
                purchase_confirmed: true
            })

            setAppState({
                cart_items: [],
                cart_amount: 0
            })
        }
        else {
            console.log('fail');
        }


    }

    async componentDidMount() {
        // let user_id = localStorage.getItem('user_id')
        // let token = localStorage.getItem('Token')
        // let URL = `http://localhost:8000/purchase_orders`
        // let res = await fetch(URL, {
        //     method: 'POST',
        //     headers: {
        //         'Authorization': `Token ${token}`
        //     }
        // })
        // let data = await res.json();
        // console.log(data.products);
    }

    async getKey() {
        this.setState({
            loading: true
        })

        let res = await fetch('http://localhost:8000/payment/')
        let data = await res.json();
        console.log(data.key);

        const stripe = await this.stripePromise;
        await stripe.redirectToCheckout({
            // sessionId: session.id,
            sessionId: data.id,
        });
        // this.setState({
        //     loading: false
        // })

        // const stripePromise = loadStripe(data.key)
    }

    render() {
        return (
            <div>
                {this.state.loading
                    ?
                    <div>Loading...</div>
                    :
                    <button onClick={() => this.getKey()}>
                        get key
                </button>
                }
            </div>
            // this.state.purchase_confirmed
            //     ?
            //     <div>
            //     <h1>Compra realizada com sucesso</h1>
            //         <Link to="/my_purchases">Ver minhas compras</Link>
            //     </div>
            //     :
            //     <div>
            //         {/* <h1>Suas Compras</h1> */}
            //         <button className="main-button" onClick={e => this.createPurchasingOrder(e)}>Confirmar Compra</button>
            //     </div>
        )
    }
}

export { PurchaseOrders }