import { Component } from "react"

class FlashMessage extends Component {

    hideError(e) {
        const [appState, setAppState] = this.props.appState;

        setAppState({
            flash_message: ''
        })
    }

    render() {
        const [appState, setAppState] = this.props.appState;

        return (
            appState.flash_message
                ?
                <div id="flash-message">
                    {/* <p>{this.state.message}</p> */}
                    <p>{appState.flash_message}</p>
                    <button onClick={(e) => this.hideError(e)}>
                        <img src="/images/close.svg" />
                    </button>
                </div>
                :
                ''
        )
    }
}

export { FlashMessage }