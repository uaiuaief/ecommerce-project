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
            <div>
                <h1> SEU PEDIDO FOI REALIZADO COM SUCESSO </h1>
            </div>
        )
    }
}

export {PurchaseSuccess}