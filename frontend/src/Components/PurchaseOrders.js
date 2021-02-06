import { Component } from "react";
// import { Link, Redirect } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';



class PurchaseOrders extends Component {
    stripePromise = loadStripe('pk_test_51I3nPqAHPQv4bwqaS2vvi7WXqZ3fSqRpokIGn2EXOr99RXKwL8FuwmQlj99UhdYV1eA3sSjNHfX8NyolJGr4gb7A00hsBy6BLx')
    state = {
        purchase_orders: null,
        purchase_confirmed: false,

        loading: false,
    }

    async componentDidMount() {
        const token = localStorage.getItem("Token");
        if (!token) {
            window.location.replace(`${window.ROOT_URL}/login`)
        }
        this.goToCheckout()
    }

    async getStripePromise() {
        // const token = localStorage.getItem("Token");
        let res = await fetch(`${window.ROOT_URL}/payment/`)
        let data = await res.json();

        const stripePromise = await loadStripe(data.key)
        return stripePromise
    }

    async goToCheckout() {
        this.setState({
            loading: true
        })

        const token = localStorage.getItem("Token");

        let res = await fetch(`${window.ROOT_URL}/payment/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: localStorage.getItem('cart')

        })

        let data = await res.json();

        const stripe = await this.getStripePromise();
        console.log(data);
        await stripe.redirectToCheckout({
            sessionId: data.id,
        });
    }

    render() {
        return (
            <div className="checkout-redirect"
            style={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                height: '500px'
            }}>
                <div>
                    <h1 style={{
                        fontSize:'2.5em'
                    }}>
                        Carregando...
                    </h1>
                </div>
            </div>
        )
    }
}

export { PurchaseOrders }