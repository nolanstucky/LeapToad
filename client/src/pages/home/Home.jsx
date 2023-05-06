import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import Header from "../../components/header/Header"
import Posts from "../../components/posts/Posts"
import Sidebar from "../../components/sidebar/Sidebar"
import "./home.css"
import axios from "axios"

export default function Home() {
    // not quite sure what useState is, it's a react component; however, the statement seems to
    // describe where setPosts() is going to send data
    const [posts,setPosts] = useState([]);
    // this line is similar to location call in SinglePost.jsx, but in this case, we're getting
    // only the "search" field from the object
    const {search} = useLocation()
    // not sure on what useEffect() really means, but it calls axios to look at our rest api via
    // referring to the proxy + the given path, so http://localhost:5000/api/posts
    useEffect(()=>{
        const fetchPosts = async ()=>{
            /*console.log("HOME INTERCEPTOR");
            axios.interceptors.request.use(request => {
                console.log('Starting Request', JSON.stringify(request, null, 2))
                return request
            })*/
            const res = await axios.get("/api/posts/"+search) 
            setPosts(res.data);
        }
        fetchPosts();
    },[search]);
    // passing the data about each blog post into the react component Posts via the variable posts,
    // in order to populate their text/images on the page
    return (
        <>
            <Header/>
            <div className="home">
                <Posts posts={posts}/>
                <Sidebar/>
            </div>
        </>
    )
}