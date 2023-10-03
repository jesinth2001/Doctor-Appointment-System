const UserModel = require('../Models/userModel');
const jwt = require('jsonwebtoken');



const Sessiontime=3*24* 60* 60
const createToken= (id) =>
{
  return jwt.sign({id},"secret key",{
    expiresIn:Sessiontime
  }); 
}

const handleErrors=(err) =>
{
  
 let errors={email:"",password:""};

 if(err.message==="Incorrect Password")
 {
  errors.password="The Password is incorrect";
  return errors;
 }
 if(err.message==="Incorrect Email")
 {
  errors.password="Invalid Email";
  return errors;
 }

 if (err.code===11000)
 {
    errors.email="Email is already registered"; 
    return errors;
 }
 if(err.message.includes("Users validation failed"))
 {
 
  Object.values(err.errors).forEach(({properties}) => 
  {
     errors[properties.path] = properties.message;
  }
  )
  return errors;
 }
}

module.exports.register=async (req,res,next)=>
{
    try
    {
    console.log(req.body)
    const {firstname,lastname,phonenumber,email,password} =req.body;
    const user =await UserModel.create({firstname,lastname,phonenumber,email,password});
    console.log("user id:"+user._id);
    const token=createToken(user._id)
    res.cookie("jwt",token,
    {
        withCrdentials: true,
        httpOnly: false,
        maxAge:Sessiontime*1000

    }
    );
    res.status(201).json({user:user._id,created:true});
    }
    catch (err)
    {
      console.log(err);
      const errors =handleErrors(err);
      res.status(201).json({errors,created:false});
    }
}
module.exports.login = async (req,res,next)=>
{

  try
  {
 
  const {email,password} =req.body;
  const user =await UserModel.login(email,password);
  const token=createToken(user._id)
  res.cookie("jwt",token,
  {
      withCrdentials: true,
      httpOnly: false,
      maxAge:Sessiontime*1000
  }
 
  );
  res.status(200).json({user:user._id,created:true});
  }
  catch (err)
  {
    console.log(err);
    const errors =handleErrors(err);
    res.json({errors,created:false});
  }
}

 

