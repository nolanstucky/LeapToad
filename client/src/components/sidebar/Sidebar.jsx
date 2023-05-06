import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import axios from "axios";
import "./sidebar.css"

export default function Sidebar() {
    const [cats,setCats] = useState([]);
    // another useEffect function; this time, we call the api's categories.js get function to give
    // us an object that contains all of our categories
    useEffect(()=> {
        const getCats = async ()=>
        {
            /*console.log("SIDEBAR INTERCEPTOR");
            axios.interceptors.request.use(request => {
                console.log('Starting Request', JSON.stringify(request, null, 2))
                return request
            })*/
            const res = await axios.get("/api/categories");
            setCats(res.data);
        };
        getCats();
    },[])
    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img
                    src="https://www.seguetech.com/wp-content/uploads/2014/08/segue-blog-stock-photos-vs-real-photos.png"
                    alt=""
                />
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut quasi inventore explicabo, nihil, ratione perferendis ipsum itaque nemo possimus modi, exercitationem quae? Id praesentium, deserunt fuga optio cumque delectus dignissimos!
                </p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    {/* another .map function; this time, instead of getting data on posts and 
                        populating Posts.jsx, we're displaying a group of collections individually
                        as (c) using the data we got from the api above
                        the Link react component also makes these categories clickable, so that
                        clicking on any one sends you back to Home.jsx with the ?cat= query being
                        whichever one you clicked on, filtering the homepage by that category */}
                    {cats.map((c) => (
                        <Link to={`/?cat=${c.name}`} className="link">
                            <li className="sidebarListItem">{c.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fab fa-facebook-square"></i>
                    <i className="sidebarIcon fab fa-twitter-square"></i>
                    <i className="sidebarIcon fab fa-pinterest-square"></i>
                    <i className="sidebarIcon fab fa-instagram-square"></i>
                </div>
            </div>
        </div>
    )
}
