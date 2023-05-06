const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');

//REGISTER
router.post("/register", async (req,res) => {
    try {
        const salt = await bcrypt.genSalt(9);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        })

        const user = await newUser.save()
        res.status(200).json(user);
    } catch(err) {
        res.status(500).json(err);
    }
})
//LOGIN
router.post("/login", async (req,res) => {
    //console.log("HERE");
    /*try {
        const user = await User.findOne({username: req.body.username})
        user == null && res.status(400).json("Wrong credentials!");
        console.log(user);
        console.log(user == null);
        console.log("HERE 2");
        
        const validated = await bcrypt.compare(req.body.password, user.password);
        console.log("HERE 2.5")
        !validated && res.status(400).json("Wrong credentials!");
        console.log(validated);
        console.log(validated == null);
        console.log("HERE 3");

        const {password, ...others} = user._doc;
        console.log("HERE 3.5");
        res.status(200).json(others);
        console.log("HERE 4");
    } catch (err) {
        console.log("HERE 5");
        console.log(err);
    }*/

    const user = await User.findOne({username: req.body.username})
    let code = 0;
    let text = "";
    if(user == null) {
        code = 400;
        text = "Wrong credentials!";
    } else {
        const validated = await bcrypt.compare(req.body.password, user.password);
        if(!validated) {
            code = 400;
            text = "Wrong credentials!";
        } else {
            const {password, ...others} = user._doc;
            code = 200;
            text = others;
        }
    }
    res.status(code).json(text);

})

module.exports = router;