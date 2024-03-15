import Navbar from "../../components/Navbar";
import "./login.scss";

function Login() {
    return <div className="login-page">
        <Navbar/>
        <span className="login-form">
            <form >
                <div className="login-title">Log In</div>
                <input placeholder="Username" className="login-input" type="text"/>
                <input placeholder="Password" className="login-input" type="text"/>
                <button className="submit-login">Submit</button>
            </form>
        </span>
    </div>;
}

export default Login;