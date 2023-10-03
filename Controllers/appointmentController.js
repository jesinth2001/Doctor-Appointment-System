const appointmentModel = require('../Models/appointmentModel');

module.exports.book=async (req,res,next)=>
{
    try
    {
    console.log(req.body)
    const {email,doctor,specialist,status} =req.body;
    const user =await appointmentModel.create({email,doctor,specialist,status});
    console.log("user id:"+user._id);
    res.status(201).json({user:user._id,created:true});
    }
    catch (err)
    {
      console.log(err);
     
    }
}
module.exports.getAppointment= async (req, res,next) => {

    const {email} = req.params;
    console.log(email)
    const User = await appointmentModel.find({email: email})
    res.send(User)
}