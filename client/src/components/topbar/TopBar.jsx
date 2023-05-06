import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css"

export default function TopBar() {
    // getting user object from our context
    // also getting dispatch function
    const {user, dispatch} = useContext(Context);

    // getting the location of our public folder, so we can display the user's profile picture
    // note: disabled this once we started using cloudinary
    //const PF = "http://localhost:5000/images/";
    
    // function for handling user logout, done by setting the user object to null via dispatching
    // to our context
    const handleLogout = () => {
        dispatch({type: "LOGOUT"})
    }
    return (
        <div className="top">
            <div className="topLeft">
                <i className="topIcon fab fa-facebook-square"></i>
                <i className="topIcon fab fa-twitter-square"></i>
                <i className="topIcon fab fa-pinterest-square"></i>
                <i className="topIcon fab fa-instagram-square"></i>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link className="link" to="/">HOME</Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to="/write">WRITE</Link>
                        </li>
                    <li className="topListItem">
                        <Link className="link" to="/">ABOUT</Link>
                        </li>
                    <li className="topListItem">
                        <Link className="link" to="/">CONTACTS</Link>
                        </li>
                    {/* Since our user object will either be populated or null, we can call it
                        like a boolean; will return true if it exists, false if not; so we display
                        "LOGOUT" only if there is a user object aka if the user is logged in
                        also, when the user clicks the button, call our handleLogout function to
                        log the user out of the blog */}
                    <li className="topListItem">
                        <Link className="link" to="/" onClick={handleLogout}>{user && "LOGOUT"}</Link>
                    </li>
                </ul>
            </div>
            <div className="topRight">
                {/* Big ternary statement displaying either our user's profile image or "LOGIN"
                    and "REGISTER", which a user shouldn't see */}
                {user ? (
                    <Link to="/settings">
                        {user.profilePic == "" ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="topImg">
                                <text
                                    className="svgText"
                                    dominantBaseline="middle"
                                    x="50%"
                                    y="55%"
                                >
                                    {user.username.charAt(0).toUpperCase()}
                                </text>
                            </svg>
                        ) : (
                            // commenting out this line since we're just using the photo's url on its own
                            //<img className="topImg" src={PF + user.profilePic} alt="" />
                            <img className="topImg" src={user.profilePic} alt="" />
                        )}
                    </Link>
                ) : (
                    <ul className="topList">
                        <li className="topListItem">
                            <Link className="link" to="/login">
                                LOGIN
                            </Link>
                        </li>
                        <li className="topListItem">
                            <Link className="link" to="/register">
                                REGISTER
                            </Link>
                        </li>
                    </ul>
                )}
                <i className="topSearchIcon fas fa-search"></i>
            </div>
        </div>
    )
}
