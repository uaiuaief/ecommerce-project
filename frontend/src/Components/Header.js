import { Component } from "react"
import { Navbar } from './Navbar'
import { Topbar } from './Topbar'
import { FlashMessage } from './FlashMessage.js'

class Header extends Component {

    render() {
        return (
            <header>
                <Topbar
                    appState={this.props.appState}
                    setAppState={this.props.setAppState} />
                <div className="content">
                    {/* <div className="navbar-container">
                        <Navbar appState={this.props.appState} />
                    </div> */}
                </div>
            </header>
        )
    }

}


export { Header }
