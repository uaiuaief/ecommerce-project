import { Component } from "react"
import { Link, Redirect } from "react-router-dom"

class Logout extends Component {
    render() {
        localStorage.removeItem('Token')
        localStorage.removeItem('username')
        localStorage.removeItem('user_id')
        this.props.setAppState({ logged_in: false })
        return (
            <Redirect to='/'></Redirect>
        )
    }
}

export { Logout }