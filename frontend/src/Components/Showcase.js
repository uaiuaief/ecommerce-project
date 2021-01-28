import { Component } from "react"
import { Link } from "react-router-dom"
import { Product } from "./Product"
import {ProductSkeleton} from "./Product"

class Showcase extends Component {
    state = {
        results: null
    }

    async componentDidMount() {
        let response = await fetch(`${window.ROOT_URL}/products/`, {
            method: 'GET',
            headers: {
            },
        })

        let data = await response.json();
        this.setState({
            results: data.results
        })
        // console.log(data.results);

        document.querySelector('body').scrollIntoView({ behavior: 'smooth', block: 'start' });

    }

    componentWillUnmount() {
        const [appState, setAppState] = this.props.appState
        setAppState({
            search_bar: ''
        })
    }

    render() {
        const [appState, setAppState] = this.props.appState
        let searchStr = appState.search_bar.toLowerCase()

        return (
            <div className="showcase">
                <div className="title-container">
                    <h1 className="title">Produtos</h1>
                </div>
                <div className="products">
                    {this.state.results
                        ?
                        this.state.results.reverse().filter(product => {
                            let product_name = product.name.toLowerCase()
                            return product_name.indexOf(searchStr) !== -1
                        }).map(product => {
                            // this.state.results.reverse().map(product => {
                            return (
                                <Link to={`/product/${product.id}`}>
                                    <Product name={product.name}
                                        price={product.price / 100}
                                        appState={this.props.appState}
                                        addToCart={this.props.addToCart}
                                        image={`${product.image}`} />
                                </Link>
                            )
                        })
                        :
                        <>
                        <ProductSkeleton />
                        <ProductSkeleton />
                        <ProductSkeleton />
                        <ProductSkeleton />
                        <ProductSkeleton />
                        <ProductSkeleton />
                        <ProductSkeleton />
                        <ProductSkeleton />
                        </>
                        // {/* <div style={{ height: '600px' }}></div> */}
                    }
                </div>
            </div>
        )
    }

}


export { Showcase }
