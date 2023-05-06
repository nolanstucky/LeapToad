import { useRef, useContext } from "react";
import { Link } from "react-router-dom"
import { Context } from "../../context/Context";
import axios from "axios"
import "./login.css"

export default function Login() {
    const userRef = useRef();
    const passwordRef = useRef();
    // getting dispatch and isFetching from our context
    const { dispatch, isFetching } = useContext(Context);

    // function that handles submitting user information, and logs the user in
    const handleSubmit = async (e) => {
        e.preventDefault();
        // when login button is clicked, will call LOGIN_START in Reducer.js, isFetching will
        // be true
        dispatch({type:"LOGIN_START"});
        try {
            // sending login data to api, seeing if it returns an error
            const res = await axios.post("/api/auth/login", {
                username: userRef.current.value,
                password: passwordRef.current.value
            })
            // calls LOGIN_SUCCESS in Reducer.js, we're sending the data gotten from our database
            // as the payload
            dispatch({type:"LOGIN_SUCCESS", payload: res.data});
        } catch(err) {
            dispatch({type:"LOGIN_FAILURE"});
        }
    };
    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    className="loginInput"
                    type="text"
                    placeholder="Enter your username..."
                    ref={userRef}
                />
                <label>Password</label>
                <input
                    className="loginInput"
                    type="password"
                    placeholder="Enter your password..."
                    ref={passwordRef}
                />
                {/* using the "disabled" html attribute to make login button unclickable
                    when currently fetching data */}
                <button className="loginButton" type="submit" disabled={isFetching}>
                    Login
                </button>
            </form>
            <button className="loginRegisterButton">
                <Link className="link" to="/register">Register</Link>
            </button>
        </div>
    )
}
