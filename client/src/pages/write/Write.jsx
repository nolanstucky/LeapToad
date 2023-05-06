import { useState, useContext } from "react"
import { Context } from "../../context/Context";
import axios from "axios";
import "./write.css"


export default function Write() {
    // functions for passing what we get back from setTitle, setDesc, setFile into respective vars
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    // we also need our user data from our Context
    const {user} = useContext(Context);

    const handleSubmit = async (e)=>{
        // do nothing if nothing is entered
        e.preventDefault();
        // create a post object with our username, title, and description
        const newPost = {
            username:user.username,
            title,
            desc,
        };
        // if the post was submitted with a file, handle that
        if(file) {
            // create new form ordered by key/value for sending the image
            const data = new FormData();
            // add the file under the "file" key to our data
            data.append("file", file)
            // create filename string by combining current date printout and the name of the
            // uploaded file
            const filename = Date.now() + file.name;
            /* like in settings.jsx, disabling this because cloudinary's api works differently
            // add the filename under the "name" key to our data
            data.append("name", filename)
            // set the "photo" field of our post to our filename
            newPost.photo = filename;
            // try to upload our file
            try {
                await axios.post("/api/upload", data);
            } catch (err){}*/

            // cloudinary requires that we know the name of a specific upload preset to securely
            // upload to cloudinary's api endpoint; including that here
            data.append("upload_preset", "v6hf50m5");
            // setting the cloudinary id of the post to the filename we generated
            data.append("public_id", "postImages/" + filename);
            try {
                // posting to cloudinary using our cloud name and upload type
                const res = await axios.post("https://api.cloudinary.com/v1_1/beanboy/image/upload", data);
                console.log("WRITE: POSTED TO CLOUDINARY");
                console.log(res);
                console.log(res.data);
                console.log(res.data.secure_url);
                newPost.photo = res.data.secure_url;
            } catch(err) {
                console.log("WRITE: GOT AN ERROR");
                console.log(err);
            }

        }
        try {
            // create response object, call our api's /posts route, and fill object with returned data
            const res = await axios.post("/api/posts", newPost);
            // change the URL to post page, passing in the id we just got from the api call
            window.location.replace("/post/" + res.data._id);
        } catch(err){
            console.log(err);
        }
    };
    return (
        <div className="write">
            {/* since the onChange function in the fileInput input will asynchronously call
                setFile and change the file object, we can use the file object as a boolean to
                display a banner with our file object's data
                we then call the createObjectURL function from javascript's URL interface
                in order to display our image */}
            {file && (
            <img
                className="writeImg"
                src={URL.createObjectURL(file)}
                alt=""
            />
            )}
            <form className="writeForm" onSubmit = {handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fas fa-plus"></i>
                    </label>
                    <input
                        // passing an arrow function to the onChange html attribute, so that
                        // whenever the field changes, onChange will call our e function, which
                        // calls setFile with the data in the field
                        type="file" 
                        id="fileInput"
                        style={{display:"none"}}
                        onChange = {e=>setFile(e.target.files[0])}
                    />
                    <input
                        // same as above, but passing the title
                        type="text"
                        placeholder="Title"
                        className="writeInput"
                        autoFocus={true}
                        onChange = {e=>setTitle(e.target.value)}
                    />
                </div>
                <div className="writeFormGroup">
                    <textarea
                        // same as above, but passing the description
                        placeholder="Tell your story..."
                        type="text"
                        className="writeInput writeText"
                        onChange = {e=>setDesc(e.target.value)}
                    ></textarea>
                </div>
                <button className="writeSubmit" type="submit">
                    Publish
                </button>
            </form>
        </div>
    )
}
