import { Component } from "react"
import { Navbar } from './Navbar'
import { Topbar } from './Topbar'

class Header extends Component {

    render() {
        return (
            <header>
                <div className="content">
                    <Topbar appState={this.props.appState} setAppState={this.props.setAppState}/>
                    {/* <div className="logo">
                        <img src="/images/vixlogo.png" />
                    </div> */}
                    {/* <h1>I'm the Header</h1> */}
                    <div className="navbar-container">
                        <Navbar appState={this.props.appState}/>
                    </div>
                </div>
            </header>
        )
    }

}


export { Header }
