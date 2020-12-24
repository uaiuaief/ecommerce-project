import { Component } from "react"

class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="useful-links">
                    <div className="links-column">
                        <h1>MORE INFO</h1>
                        <a id ="contact" href="#">Contact</a>
                        <a href="#">Home</a>
                        <a href="#">About</a>
                        <a href="#">FAQ</a>
                    </div>
                    <div className="links-column">
                        <h1>CATEGORIES</h1>
                        <a href="#">Lorem</a>
                        <a href="#">Ipsum</a>
                        <a href="#">Dolor</a>
                        <a href="#">Requiem</a>
                    </div>

                </div>
                <div className="copyright">
                    © 2020 Vix Decoração . All Rights Reserved | Design by John
                </div>
            </footer >
        )
    }

}


export { Footer }

