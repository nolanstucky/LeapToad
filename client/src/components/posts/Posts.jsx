import Post from "../post/Post"
import "./posts.css"

export default function Posts({posts}) {
    return (
        <div className="posts">
            {
            // using map function, which is an array function, to break variable posts into
            // individual pieces (p), and then create a post inside Posts.jsx for each entry
            // passed into the file by Home.jsx, filled with the corresponding information.
            // kind of like a foreach loop
            posts.map((p)=> (
                <Post key="{p}" post={p}/>
            ))}
        </div>
    );
}