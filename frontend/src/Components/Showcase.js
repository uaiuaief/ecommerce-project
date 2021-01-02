import { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import { Product } from "./Product"

class Showcase extends Component {
    state = {
        results: null
    }

    async componentDidMount() {
        let response = await fetch("http://127.0.0.1:8000/products/", {
            method: 'GET',
            headers: {
            },
        })

        let data = await response.json();
        this.setState({
            results: data.results
        })
        // console.log(data.results);

        document.querySelector('body').scrollIntoView({behavior: 'smooth', block: 'start' });

    }

    render() {
        const {appState} = this.props
        return (
            <div className="showcase">
                <div className="title-container">
                    <h1 className="title">Produtos</h1>
                </div>
                <div className="products">
                    {this.state.results
                        ?
                        this.state.results.reverse().map(product => {
                            return (
                                <Link to={`/product/${product.id}`}>
                                    <Product name={product.name}
                                        price={product.price / 100}
                                        appState={appState}
                                        addToCart={this.props.addToCart}
                                        image={`${product.image}`} />
                                </Link>
                            )
                        })
                        :
                        <div style={{height: '600px'}}></div>
                    }
                </div>
            </div>
        )
    }

}


export { Showcase }
