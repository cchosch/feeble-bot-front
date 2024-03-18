import { useState } from "react";
import Navbar from "../../components/Navbar";
import "./login.scss";

function Login() {
    const [rememberMe, setRememberMe]  = useState(true);
    return <div className="login-page">
        <Navbar/>
        <span className="login-form">
            <form >
                <div className="login-title">Log In</div>
                <div style={{width: "100%"}}>
                    <label>Username</label>
                    <input className="login-input" type="text"/>
                </div>
                <div style={{width: "100%"}}>
                    <label>Password</label>
                    <input className="login-input" type="password"/>
                </div>
                <div className="under-login-form">
                    <span onClick={() => setRememberMe(v => !v)} style={{cursor: "pointer", userSelect: "none"}}>
                        <input type="checkbox" readOnly checked={rememberMe} className="remember-me-login"/>
                        Remember Me
                    </span>
                </div>
                <button className="submit-login">Submit</button>
            </form>
        </span>
    </div>;
}

export default Login;