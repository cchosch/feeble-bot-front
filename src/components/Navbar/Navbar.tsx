import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { State } from "../../store";
import "./navbar.scss";

function Navbar() {
    const user = useSelector((s: State) => s.user.user);

    return <div className="navbar-cont">
        <div>
            <Link to="/" className="fb-title">
                Feeble <b>Bot</b>
            </Link>
        </div>
        <div>
            {!user ? <Link to="/login"><button>Login</button></Link> : <>
                <button>{user.username}</button>
            </>}
            
        </div>
    </div>;
}

export default Navbar;