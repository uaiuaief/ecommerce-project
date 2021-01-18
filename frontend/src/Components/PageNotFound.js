import { Link, Redirect } from "react-router-dom";

const { Component } = require("react");

class PageNotFound extends Component {
    render() {
        return (
            <div className="page-not-found">
                <div>
                    <h1>404</h1>
                    <p>A página que você está procurando não existe.</p>
                    <Link className='primary-button' to="/">Página Inicial</Link>
                </div>
            </div>
        )
    }
}

export { PageNotFound }