const doctorModel=require('../Models/doctorModel');

module.exports.getDoctorDetails=async(req,res,next) =>
{
    const doctors =await doctorModel.find({})
    res.send(doctors)
}