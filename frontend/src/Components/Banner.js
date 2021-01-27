import { Component } from "react";


class Banner extends Component {

    render() {
        return (
            <div className="banner">
                <img src="/images/banner3.jpg" alt='banner'/>
                <div className="text">
                    <h1> Big Text Inside Banner </h1>
                    <p>
                        {/* Lorem ipsum dolor sit amet consectetur 
                        adipisicing elit. Deleniti atque sapiente 
                        aut. Repellat aliquid offici */}
                    </p>
                </div>
            </div>
        )
    }

}


export { Banner }
