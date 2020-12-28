import { Component } from "react";


class PurchaseOrders extends Component {
    state = {
        purchase_orders: null
    }

    async createPurchasingOrder() {
        let token = localStorage.getItem('Token')
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
        form_data.append('user', 'http://localhost:8000/users/8/');
        form_data.append('value', total_price);

        // Não funciona
        item_urls.map(product => {
            for(let i = 0; i < product.amount; i++){
                form_data.append('products', product.url)
            }
        })
        // --------------

        let res = await fetch(URL, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`
            },
            body: form_data,
        })
        let data = await res.json();
        console.log(data);
        // console.log(data.products);

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

    render() {
        return (
            <div>
                <h1>Suas Compras</h1>
                <button onClick={e => this.createPurchasingOrder(e)}>Confirmar Compra</button>
            </div>
        )
    }
}

export { PurchaseOrders }