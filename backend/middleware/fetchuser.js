const jwt = require('jsonwebtoken');

//we will add this function to every route where login is required
const fetchuser = (req, res, next) =>{
    //get the user from jwt token and add id to req object
    const token =req.header('auth-token');

    if(!token){
        res.status(401).send("Access denied");
    }

    try{
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        next();
    }catch(error){
        req.send(401).send({error:" please authenticate using valid token"});
    }
    
}

module.exports =fetchuser;