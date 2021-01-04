import { Component } from "react";

class PurchaseProduct extends Component {
    render() {
        const { product } = this.props;
        return (
            <div id={`item-${this.props.listID}`} className="purchase-item">
                <div className="flex ">
                    <div className="cart-image-wrapper">
                        <img src={product.image} alt='' />
                    </div>
                    <div className="item-description">
                        <h1 className="item-title">
                            {product.name}
                        </h1>
                        <p>
                            {product.description}
                        </p>
                    </div>
                </div>
                <div className="product-amount">
                    <div className="light-container">
                        Quantidade
                    </div>
                    <div className="">
                        <p className="info-text">1{this.props.product.amount}</p>
                    </div>
                    <small>Unidades</small>
                </div>
                <div className="price-container">
                    <div className="">
                        Total:
                    </div>
                    <div className="price">
                        R$ {product.price / 100},00
                    </div>
                </div>
            </div>
        )
    }
}

class Purchase extends Component {
    state = {
        collapsed: true
    }

    toggleCollapse(event, element_id) {
        let el = document.querySelector(`#purchase-${element_id} .purchase-product-list`)
        el.style.display = this.state.collapsed ? "initial" : "none";

        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    render() {
        const { purchase } = this.props;
        let img_src = this.state.collapsed ? "/images/expand.svg" : "/images/collapse.svg"
        return (
            <div id={`purchase-${purchase.id}`} className="purchase" >
                <div className="purchase-info">
                    <p><strong>Data:</strong> {purchase.date} </p>
                    <p><strong>Valor da compra:</strong>  R$ {purchase.value / 100},00 </p>
                    <p><strong>Status:</strong> {purchase.status == "waiting payment" ? "Aguardando pagamento" : ""} </p>
                </div>
                <div className="heading">
                    <h1 className="page-title">Produtos</h1>
                    <button className="expand-button"
                        onClick={(e) => this.toggleCollapse(e, purchase.id)}>
                        <img src={img_src} />
                    </button>
                </div>

                <div className="purchase-product-list">
                    {/* <h2>Produtos</h2> */}
                    {purchase.products.map(product => {
                        return (
                            <PurchaseProduct
                                listID={product.id}
                                product={product}
                            />
                        )
                    })}
                </div>
            </div >
        )
    }
}

class MyPurchases extends Component {
    state = {
        purchases: null

    }

    async componentDidMount() {
        let token = localStorage.getItem('Token')
        let url = `http://localhost:8000/purchase_orders/`;
        let res = await fetch(url, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        let data = await res.json();

        let purchases = data.results

        this.setState({
            purchases: data.results
        })
    }

    render() {
        return (
            <section className="my-purchases-page">
                <h1>Últimas Compras</h1>


                <div className="purchase-list">
                    {this.state.purchases
                        ?
                        <>
                            {this.state.purchases.map(each => (
                                <Purchase purchase={each} />
                            ))}
                        </>
                        :
                        <p>loading...</p>
                    }
                </div>
            </section>
        )
    }
}

export { MyPurchases }