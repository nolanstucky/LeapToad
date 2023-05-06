const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
//const multer = require("multer");
//const path = require("path");
const cors = require("cors");

dotenv.config();
// need to use cors middleware so netlify and heroku can communicate
app.use(cors());
app.use(express.json());
// making new express api route, the first "/images", and using the path library to connect it
// to our directory inside the project folder called "images"
// note: now commented out because we're using cloudinary instead
//app.use("/images", express.static(path.join(__dirname, "/images")))

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(console.log("Connected to MongoDB"))
.catch((err)=>console.log(err));

// commenting out multer because we're using cloudinary instead
/*const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename:(req, file, cb) => {
        cb(null, req.body.name);
    }
})

const upload = multer({storage: storage});
app.post("/api/upload", upload.single("file"),(req,res) => {
    res.status(200).json("File has been uploaded");
});*/

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.use("/api/categories", categoryRoute);

/*app.use("/api/auth/register", (req,res) => {
    console.log("hey this is main url")
})*/

app.listen(process.env.PORT || "5000", () => {
    console.log("Backend is running.");
});