import { useLocation } from "react-router";
import { Link } from "react-router-dom";

function NotFound() {

    const { pathname } = useLocation()

    return (
        <section className="notfound">
            <div className="container">
                <div className="notfound-inner inner">
                    <div className="notfound-content content">
                        <div className="notfound-title title">
                            <h1>Not Found</h1>
                        </div>
                        <div className="notfound-info info">
                            <p>No matches for <code>{pathname}</code>.The page you are looking for was moved, removed, renamed or might never existed.</p>
                        </div>
                        <Link exact to="/"><button className="notfound-button button-first">home</button></Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NotFound;