import { useState, useContext } from "react";
import { Context } from "../../context/Context";
import Sidebar from "../../components/sidebar/Sidebar"
import axios from "axios"
import "./settings.css"

export default function Settings() {
    // putting information into file object if setFile is called
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);

    // getting our user information and dispatch function from our context
    const {user, dispatch} = useContext(Context);

    // getting the location of our public folder, so we can display the user's profile picture
    // note: disabled this once we started using cloudinary
    //const PF = "http://localhost:5000/images/";

    const handleSubmit = async (e)=>{
        // do nothing if nothing is entered
        e.preventDefault();
        // tell our context that the user has started updating their profile
        dispatch({type:"UPDATE_START"});
        // create a new user object with our updated user information
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password
        };
        // if the post was submitted with a file, handle that
        if(file) {
            // create new form ordered by key/value for sending the profile pic
            const data = new FormData();
            // add the file under the "file" key to our data
            data.append("file", file)
            // create filename string by combining current date printout and the name of the
            // uploaded file
            const filename = Date.now() + file.name;
            /* not using these commands because Cloudinary's api needs to be handled differently
            // add the filename under the "name" key to our data
            data.append("name", filename)
            // set the "profilePic" field of our new user object to our filename
            updatedUser.profilePic = filename;
            // try to upload our file, through multer's /upload path in our api
            try {
                await axios.post("/api/upload", data);
            } catch (err){}*/

            // cloudinary requires that we know the name of a specific upload preset to securely
            // upload to cloudinary's api endpoint; including that here
            data.append("upload_preset", "v6hf50m5");
            // setting the cloudinary id of the post to the filename we generated
            data.append("public_id", "profilePics/" + filename);
            try {
                // posting to cloudinary using our cloud name and upload type
                const res = await axios.post("https://api.cloudinary.com/v1_1/beanboy/image/upload", data);
                console.log("SETTINGS: POSTED TO CLOUDINARY");
                console.log(res);
                console.log(res.data);
                console.log(res.data.secure_url);
                updatedUser.profilePic = res.data.secure_url;
            } catch(err) {
                console.log("SETTINGS: GOT AN ERROR");
                console.log(err);
            }
        }
        try {
            // not going to create response object like in Write.jsx; simply just going to put
            // our new user information to the api
            const res = await axios.put("/api/users/" + user._id, updatedUser);
            // since the axios.post would have tripped the try/catch statement upon not
            // working, we call setSuccess with true to set our success boolean true and
            // display the success text at the bottom
            setSuccess(true);
            // dispatch to our context that the update was successful; pass user data to context
            // so we can update it
            dispatch({type:"UPDATE_SUCCESS", payload: res.data});
        } catch(err){
            console.log(err);
            // dispatch to our context that the update failed
            dispatch({type:"UPDATE_FAILURE"});
        }
    };
    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update your Account</span>
                    <span className="settingsDeleteTitle">Delete your Account</span>
                </div>
                {/* onSubmit calls handleSubmit function, which will update the user data */}
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile picture</label>
                    <div className="settingsPP">
                        {/* if we've uploaded a file, then use the URL javascript interface to
                            create an object url for the file, and display it; if not, just
                            display current profile pic */}
                        {file ? (
                            <img src={URL.createObjectURL(file)} alt=""/>
                        ) : (
                            user.profilePic == "" ? (
                                <svg xmlns="http://www.w3.org/2000/svg">
                                    <text className="placeholderPfp"
                                        dominantBaseline="middle"
                                        x="50%"
                                        y="55%">
                                        {user.username.charAt(0).toUpperCase()}
                                    </text>
                                </svg>
                            ) : (
                                // commenting out this line since we're just using the photo's url on its own
                                //<img src={PF + user.profilePic} alt=""/>
                                <img src={user.profilePic} alt=""/>
                            )
                        )}
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon far fa-user-circle"></i>
                        </label>
                        <input 
                        //  when the user changes the page, the html attribute onChange will call
                        //  the e function, which calls setFile with the data in the field, 
                        //  updating the "file" variable with our new photo
                            type="file" 
                            id="fileInput" 
                            style={{display:"none"}}
                            onChange = {e=>setFile(e.target.files[0])}
                        />
                    </div>
                    <label>Username</label>
                    {/* fetching username from our user context, putting it in the update form's
                        placeholder text
                        onChange function is like above, but for our username*/}
                    <input type="text" 
                        placeholder={user.username} 
                        onChange = {e=>setUsername(e.target.value)}
                    />
                    <label>Email</label>
                    {/* same as above, but with our email */}
                    <input
                        type="email"
                        placeholder={user.email}
                        onChange = {e=>setEmail(e.target.value)}
                    />
                    <label>Password</label>
                    {/* same as above, but with our password*/}
                    <input
                        type="password"
                        onChange = {e=>setPassword(e.target.value)}
                    />
                    <button className="settingsSubmit" type="submit">Update</button>
                    
                    {success && <span className="settingsUpdateText">Profile has been updated</span>}
                </form>
            </div>
            <Sidebar/>
        </div>
    )
}
