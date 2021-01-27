import { Redirect } from "react-router-dom";

const { Component } = require("react");

class LoginRequired extends Component {
    render() {
        if (!localStorage.getItem('Token')) {
            return (
                <div className="">
                    <Redirect className="primary-button" to={{
                        pathname: "/login",
                        state: {
                            flash_message: this.props.flash_message,
                            flash_message_type: this.props.flash_message_type,
                            next_page: `${this.props.next_page}`
                        }
                    }} />
                </div>
            )
        }
        else {
            return <></>
        }


    }
}

export { LoginRequired }