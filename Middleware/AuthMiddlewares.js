const User =require("../Models/userModel")
const jwt = require("jsonwebtoken")

module.exports.checkUser =(req,res,next) =>
{
    const token = req.cookies.jwt;
   
    if(token)
    {
   jwt.verify(token,"secret key",async (err,decodedToken) =>{
    if(err)
    {
        res.josn({status:false})
        next();
    }
    else
    {
        const user =await  User.findById(decodedToken.id)
      
        if(user)
        {
            res.json({status:true,user:user.email,username:user.firstname});
        }
        else
        {
            res.json({status:false})
            next();
        }
    }
   })
    }
    else{
        res.josn({status:false})
        next();
    }
}