import { Component } from "react"
import { Link, Redirect } from "react-router-dom"

class Logout extends Component {
    render() {
        localStorage.removeItem('Token')
        console.log(this.props);
        this.props.setAppState({ logged_in: false })
        return (
            <Redirect to='/'></Redirect>
        )
    }
}

export { Logout }