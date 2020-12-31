import { Component } from "react";


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
        console.log(purchases);

        this.setState({
            purchases: data.results
        })
    }

    render() {
        return (
            <div>
                <h1>Suas Compras</h1>
                <div>
                    {this.state.purchases
                        ?
                        <>
                            {this.state.purchases.reverse().map(each => (
                                <div style={{width: "250px", margin: 'auto'}}>
                                    <br/>
                                        {each.products.map(each => {
                                            return(
                                                <div style={{
                                                    display: "flex",
                                                    height: "200px",
                                                    width: "200px",
                                                    margin: "auto"
                                                }}>
                                                    <img src={each.image} style={{
                                                        width: "100%",
                                                        objectFit: "contain"
                                                    }}></img>
                                                </div>
                                            )
                                        })}
                                    <h2>Compra</h2>
                                    <p>Valor da compra: R$ {each.value/100},00 </p>
                                    <p>Data: {each.date} </p>
                                    <p>Status: {each.status} </p>
                                    <br/>
                                </div>
                            ))}
                        </>
                        :
                        <p>loading...</p>
                    }
                </div>
            </div>
        )
    }
}

export { MyPurchases }