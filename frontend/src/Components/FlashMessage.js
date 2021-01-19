import { Component } from "react"

class FlashMessage extends Component {
    state = {
        message_type: 'error'
    }

    hideError(e) {
        const [appState, setAppState] = this.props.appState;

        setAppState({
            flash_message: ''
        })
    }

    render() {
        const [appState, setAppState] = this.props.appState;
        let message_type = appState.flash_message_type ? appState.flash_message_type : 'error'

        return (
            appState.flash_message
                ?
                <div id="flash-message" className={`${message_type}`}>
                    {/* <p>{this.state.message}</p> */}
                    <p>{appState.flash_message}</p>
                    <button onClick={(e) => this.hideError(e)}>
                        <img src="/images/close.svg" alt='close'
                        style={{
                            filter: 'invert(100%)'
                        }} />
                    </button>
                </div>
                :
                ''
        )
    }
}

export { FlashMessage }