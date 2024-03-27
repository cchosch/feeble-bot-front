import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../api/user";
import Navbar from "../../components/Navbar";
import { setUser } from "../../store/user";
import "./login.scss";

function Login() {
    const [rememberMe, setRememberMe]  = useState(true);
    const usernameInp = useRef<null | HTMLInputElement>(null);
    const passInp = useRef<null | HTMLInputElement>(null);
    const dispatch = useDispatch();

    return <div className="login-page">
        <Navbar/>
        <span className="login-form">
            <form onSubmit={(ev) => {
                ev.preventDefault();
                const u = usernameInp.current;
                const p = passInp.current;
                if(!u || !p)
                    return;
                
                login(u.value, p.value).then((v) => {
                    dispatch(setUser(v));
                });
            }}>
                <div className="login-title">Log In</div>
                <div style={{width: "100%"}}>
                    <label>Username</label>
                    <input ref={usernameInp} className="login-input" type="text"/>
                </div>
                <div style={{width: "100%"}}>
                    <label>Password</label>
                    <input ref={passInp} className="login-input" type="password"/>
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