import { Link } from "react-router-dom";

const { Component } = require("react");

class PurchaseSuccess extends Component {
    componentDidMount() {
        const [appState, setAppState] = this.props.appState
        setAppState({
            cart_items: [],
            cart_amount: 0
        })
    }

    render() {
        return (
            <div className="purchase-success-page">
                <h1>Seu pedido foi realizado com sucesso !</h1>
                <div className="buttons">
                    <Link className="primary-button" to="/">Continuar Comprando</Link>
                    <Link className="muted-button-2" to="/my_purchases">Ver Pedido</Link>
                </div>
            </div>
        )
    }
}

export { PurchaseSuccess }