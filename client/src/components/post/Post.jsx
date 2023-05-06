import "./post.css";
import { Link } from "react-router-dom"

export default function Post({post}) {
    // declaring a public folder location to display images from
    // note: disabled this once we started using cloudinary
    // const PF = "http://localhost:5000/images/";
    return (
        <div className="post">
            {/* added this so that clicking on the image will also link you to the post */}
            <Link to={`/post/${post._id}`} className="link">
            {
            // cheeky conditional usage: using post object passed in by Posts.jsx, create a
            // postImg div only if post.photo exists
            post.photo ? (
                <img
                    className="postImg"
                    // commenting out this line since we're just using the photo's url on its own
                    // src = {PF + post.photo}
                    src = {post.photo}
                    alt=""
                />
            ) : (
                <img
                    className="postImg"
                    // if no photo exists, use our placeholder image instead
                    src = "https://res.cloudinary.com/beanboy/image/upload/v1626718138/reactblog/post_image_placeholder_vytptl.jpg"
                    alt=""
                />
            )}
            </Link>
            <div className="postInfo">
                <div className="postCats">
                    {post.categories.map((c)=> (
                        <span className="postCat">{c}</span>
                    ))}
                </div>
                {/* using react-router-dom's Link and the id imported in the post variable, change
                    the page to a SinglePost.jsx with the url set to a specific post's id.
                    Remember, the link knows to go to SinglePage.jsx because of the /post/ route
                    defined in App.js */}
                <Link to={`/post/${post._id}`} className="link">
                    <span className="postTitle">{post.title}</span>
                </Link>
                <hr/>
                <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
            </div>
            {/* commenting this because I think just the title + image looks better
            <p className="postDesc">
                {post.desc}
                </p>
            */}
        </div>
    )
}
