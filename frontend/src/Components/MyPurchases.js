import { Component } from "react";
import { LoginRequired } from "./LoginRequired"


class PurchaseProduct extends Component {
    render() {
        const { product } = this.props;
        return (
            <div id={`item-${this.props.listID}`} className="purchase-item">
                <div className="flex ">
                    <div className="cart-image-wrapper">
                        <img src={product.product.image} alt='' />
                    </div>
                    <div className="item-description">
                        <h1 className="item-title">
                            {product.product.name}
                        </h1>
                        <p>
                            {product.product.description}
                        </p>
                    </div>
                </div>
                <div className="product-amount">
                    <div className="light-container">
                        Quantidade
                    </div>
                    <div className="">
                        <p className="info-text">{this.props.product.quantity}</p>
                    </div>
                    <small>Unidades</small>
                    <div className="unit-price" style={{ marginTop: ".5em", fontSize: '1.2em' }}>
                        R$ {product.product.price / 100},00
                    </div>
                </div>
                <div className="price-container">
                    <div className="">
                        Total:
                    </div>
                    <div className="price">
                        R$ {this.props.product.quantity * product.product.price / 100},00

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

        let status = purchase.status;
        switch (status) {
            case 'waiting payment':
                status = 'Aguardando pagamento' 
                break;
        
            case 'payment confirmed':
                status = 'Pagamento confirmado'; 
                break;
            
            default:
                return
        }

        return (
            <div id={`purchase-${purchase.id}`} className="purchase" >
                <div className="purchase-info">
                    <p><strong>Data:</strong> {purchase.date} </p>
                    <p><strong>Valor da compra:</strong>  R$ {purchase.value / 100},00 </p>
                    <p><strong>Status:</strong> {status} </p>
                </div>
                <div className="heading">
                    <h1 className="page-title">Produtos</h1>
                    <button className="expand-button"
                        onClick={(e) => this.toggleCollapse(e, purchase.id)}>
                        <img src={img_src} alt="expand" />
                    </button>
                </div>

                <div className="purchase-product-list">
                    {/* <h2>Produtos</h2> */}
                    {purchase.purchased_products.map(product => {
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
        let url = `${window.ROOT_URL}/purchase_orders/`;

        let res = await fetch(url, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        let data = await res.json();

        // let purchases = data.results

        this.setState({
            purchases: data.results
        })
    }

    render() {
        return (
            <section className="my-purchases-page">
                <LoginRequired
                    next_page="/my_purchases"
                    flash_message="Faça login para visualizar seus pedidos"
                    flash_message_type="warning" />

                <h1>Últimas Compras</h1>


                <div className="purchase-list">
                    {this.state.purchases == null
                        ?
                        <p>Carregando...</p>

                        :
                        this.state.purchases.length
                            ?
                            <>
                                {this.state.purchases.map(each => (
                                    <Purchase purchase={each} />
                                ))}
                            </>
                            :

                            <>
                                <div className="empty-cart">
                                    <h1>Você não possui nenhuma compra.</h1>
                                    {/* <Link className="primary-button" to="/">Ver produtos</Link> */}
                                </div>
                            </>
                    }
                </div>
            </section>
        )
    }
}

export { MyPurchases }