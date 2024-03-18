import { Link } from "react-router-dom";
import "./navbar.scss";

function Navbar() {
    return <div className="navbar-cont">
        <div>
            <Link to="/" className="fb-title">
                Feeble <b>Bot</b>
            </Link>
        </div>
        <div>

        </div>
    </div>;
}

export default Navbar;