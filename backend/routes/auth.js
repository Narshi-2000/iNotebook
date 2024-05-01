const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

//POUTE 1:create a user using POST "/api/auth/": no login required
router.post("/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {

    let success = false;
    
    try {
      // if there are errors ,return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //check whether the user with same email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success,error: "sorry a user with same email exists already"});
      }
      //create a secure password
      const salt= await bcrypt.genSalt(10);
      secpass = await bcrypt.hash(req.body.password, salt);

      //create a user and return the user
      user = await User.create({
        name: req.body.name,
        password: secpass,
        email: req.body.email,
      });

      //send the jwt token with user id(indexes in the db)
      const data = {
        user:{
            id: user.id
        }
      }
      const authtoken = jwt.sign(data, process.env.JWT_SECRET);
      success = true;
      res.json({success, authtoken})

    } catch (error) {
      res.status(500).send({success, error: "Internal server error occurred"});
    }
  }
);

//ROUTE 2:Authenticate a user using POST: "/api/auth/login" . No login required
router.post("/login",
    [body("email", "Enter a valid email").isEmail(),
    body("password","Password cannot be blank").exists()
],
    async (req, res) => {

      let success = false;
      // if there are errors ,return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {email, password} =req.body;

      try{
        //check whether the user exists or not if not then send back error
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success, error: "Please try to login with correct credentials"});
        }

        //check the password with password in database
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({success ,error: "Please try to login with correct credentials"});
        }

        //send authentication token back after successful login
        const data = {
            user:{
                id: user.id
            }
        }
        success = true;
        const authtoken = jwt.sign(data, process.env.JWT_SECRET);
        res.json({success, authtoken});

      }catch{
        res.status(500).send("Internal server error occurred");
      }

    }
)

//ROUTE 3: get user details POST: "/api/auth/getuser" . login required
router.post("/getuser", fetchuser, async(req, res)=>{
    try{
        userId=req.user.id;
        const user= await User.findById(userId).select("-password");
        res.send(user);
        
    }catch(error){
        res.status(500).send("Internal server error occurred");
    }
})


module.exports = router;
