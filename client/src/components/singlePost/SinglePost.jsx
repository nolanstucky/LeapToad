import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom"
import { Context } from "../../context/Context";
import "./singlePost.css";
import axios from "axios";

export default function SinglePost() {
    // "location" is the current url
    const location = useLocation()
    // "path" is the page's id, which is scraped from the url
    const path = location.pathname.split("/")[2];
    // another useState function; not sure what exactly it is, but it seems like it gives the data
    // sent by setPost to the variable post
    const [post, setPost] = useState({});
    // our public folder of images; will display this post's image with it
    // note: disabled this once we started using cloudinary
    //const PF = "http://localhost:5000/images/";
    // get the user data from our context
    const { user, dispatch } = useContext(Context);

    // need to handle user pressing update button
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);
    
    // problem: if you set the username in your local storage to the posts's username, you could
    // edit anyone's posts
    // solution: first, if the id isn't valid at all, then log the user out; then, if we know the
    // userId is valid, we can update the username in the locally stored data via dispatching a
    // login_success action to the one we get back from calling getUser
    useEffect(()=> {
        const refreshUserData = async ()=> {
            // declare variable for user we get back from api
            var userFromId;
            // try/catch block, see if the given id is even valid at all
            try {
                userFromId = await axios.get("/api/users/"+user._id);
            } catch(err){}
            if(!userFromId) {
                dispatch({type: "LOGOUT"});
            } else {
                dispatch({type:"LOGIN_SUCCESS", payload: userFromId.data});
            }
        };
        refreshUserData();
    }, []);

    // again, not sure exactly what useEffect is, but the statement calls the api with the
    // proxy url + /posts/ + path; so, something like http://localhost:5000/api/posts/12345
    useEffect(()=> {
        const getPost = async ()=>{
            // get the post data from our api through posts.js's get function; 
            const res = await axios.get("/api/posts/"+path)
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        };
        getPost();
    },[path]);

    // delete the post when the user presses the trash icon
    const handleDelete = async () => {
        try {
            // call the delete function in our api under posts.js to remove the current post
            // from the database; passing it the username from the context
            await axios.delete("/api/posts/" + path, {
                data:{username:user.username}
            });
            // go back to the homepage
            window.location.replace("/");
        } catch(err){}
    }

    // when the user presses the submit button, give the new data to our api and reload the page
    const handleUpdate = async()=>{
        try {
            // updating post via our api by calling put function in posts.js with our username
            await axios.put("/api/posts/" + path, {username:user.username, title:title, desc:desc});
            // 
            setUpdateMode(false);
        } catch(err){}
    }

    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {/* only display post image if it exists; use the photo url in post in conjunction
                    with our photo folder url defined above to get the right picture */}
                {post.photo && (
                    <img
                        className="singlePostImg" 
                        // commenting out this line since we're just using the photo's url on its own
                        //src={PF + post.photo}
                        src = {post.photo}
                        alt=""
                    />
                )}
                {   // -kind of ugly block of html inside a big ternary operator; basically, if we
                    //  are the owner of the post and have clicked the update button, we want to
                    //  turn the title and buttons into a single text input box
                    // -old line of code: value={post.title} before we made page updateable; we can
                    //  use just "title" instead because we pass the response data for title
                    //  directly into its own variable instead of accessing a field in "post"
                    // -also, onChange attribute calls setDesc to update our description variable
                    //  whenever the field changes
                    updateMode ? (
                        <input type="text"
                        value={title}
                        className="singlePostTitleInput"
                        autoFocus
                        onChange={(e)=>setTitle(e.target.value)}/> 
                    // :(
                    ) : (
                        <h1 className="singlePostTitle">
                            {title}
                            {/* conditional statement to only display edit and delete buttons if
                                you are the owner of the post*/}
                            {post.username === user?.username && (
                                <div className = "singlePostEdit">
                                    <i 
                                    //  if the edit button is pressed, we call setUpdateMode with true
                                    //  to turn the page into edit mode
                                        className="singlePostIcon far fa-edit"
                                        onClick = {()=>setUpdateMode(true)}
                                    ></i>
                                    <i 
                                    //  if the delete button is pressed, we call handleDelete delete our
                                    //  post via the api and redirect the page back to home
                                        className="singlePostIcon far fa-trash-alt"
                                        onClick = {handleDelete}
                                    ></i>
                                </div>
                            )}
                        </h1>
                    )
                }
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                    {/* Link react component; what this really is calling is to go to Home.jsx but
                        add on a ?user= to the url to filter for a certain user's posts */}
                    Author: 
                    <Link to={`/?user=${post.username}`} className="link">
                        <b>{post.username}</b>
                    </Link>
                    </span>
                    <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
                </div>
                {updateMode ? (
                    // old line of code: value={post.desc} before we made page updateable
                    // onChange function: pass context of text input into desc variable via setDesc
                    <>
                        <textarea
                            className = "singlePostDescInput"
                            value={desc}
                            onChange={(e)=>setDesc(e.target.value)}
                        />
                        {/* call handleUpdate function to update post via api and set updateMode
                            to false; don't need to reload the page since we constantly update
                            our variables */}
                        <button className="singlePostButton" onClick={handleUpdate}>
                            Submit
                        </button>
                    </>
                ) : (
                    <p className = "singlePostDesc">{desc}</p>
                )}
            </div>
        </div>
    )
}
