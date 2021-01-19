import { Component } from "react"

class About extends Component {
    componentDidMount() {
        document.querySelector('body').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    render() {
        return (
            <section
                className="about"
                style={{
                    backgroundImage: "url(/images/aboutus-background.jpg)",
                    backgroundPosition: "30% 40%",
                    backgroundSize: "cover"
                }}>
                <div className="about-wrapper">
                    <div className="text-container">
                        <h1>Sobre Nós</h1>
                        <br />
                        <p>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                            accusantium doloremque laudantium, totam rem aperiam, eaque
                            ipsa quae ab illo inventore veritatis et quasi architecto beatae
                            vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                            voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
                            magni dolores eos qui ratione voluptatem sequi nesciunt.
                        </p>
                        <br />
                        <p>
                            At vero eos et accusamus et iusto odio dignissimos ducimus qui
                            blanditiis praesentium voluptatum deleniti atque corrupti quos
                            dolores et quas molestias excepturi sint occaecati cupiditate non
                            provident, similique sunt in culpa qui officia deserunt mollitia
                            animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis
                            est et expedita distinctio.
                        </p>
                    </div>
                </div>
            </section>
        )
    }

}


export { About }