import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import "./register.css"
import axios from "axios"

export default function Register() {
    // more useState functions, hooking up our data
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    // user experience detail that will tell user if something goes wrong; "error" variable is
    // later use to toggle a span on/off below if there was an error during registration
    const [error,setError] = useState(false);

    const handleSubmit = async (e)=>{
        // When submit button is pressed, don't do anything
        e.preventDefault();
        // even though error is false by default, we want to set it false in the period after the
        // user presses the button and we're still waiting on our database, just for quality of
        // experience
        setError(false);
        try {
            // we call our auth.js register function with the given username, email and password
            const res = await axios.post("/api/auth/register", {
                username,
                email,
                password
            });
            res.data && window.location.replace("/login");
        } catch(err) {
            setError(true);
        }
    };

    return (
        <div className="register">
            <span className="registerTitle">Register</span>
            {/* html's onSubmit listens for when we hit the submit button, and calls handleSubmit
                when that happens*/}
            <form className="registerForm" onSubmit={handleSubmit}>
                <label>Username</label>
                {/* with the onChange line below as well as the others, we're making use of html's
                    onChange function by giving it a function e as a variable, which will then
                    call our setUsername function above with the data in the field, which is
                    (e.target.value) */}
                <input
                    className="registerInput"
                    type="text"
                    placeholder="Enter your username..." 
                    onChange = {e=>setUsername(e.target.value)}
                />
                <label>Email</label>
                <input
                    className="registerInput"
                    type="text"
                    placeholder="Enter your email..."
                    onChange = {e=>setEmail(e.target.value)}
                />
                <label>Password</label>
                <input
                    className="registerInput"
                    type="password"
                    placeholder="Enter your password..."
                    onChange = {e=>setPassword(e.target.value)}
                />
                <button className="registerButton" type="submit">Register</button>
            </form>
            <button className="registerLoginButton">
                <Link className="link" to="/login">Login</Link>
            </button>
            {error && <span style={{color:"red", marginTop:"10px"}}>"Something went wrong..."</span>}
        </div>
    )
}
