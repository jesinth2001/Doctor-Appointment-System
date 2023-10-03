const {register,login} =require('../Controllers/userController');
const {checkUser} =require('../Middleware/AuthMiddlewares');
const {getDoctorDetails} =require('../Controllers/doctorController');
const {book,getAppointment}=require('../Controllers/appointmentController');
const router = require('express').Router();

router.post("/register",register);
router.post("/login",login);
router.post("/check",checkUser);
router.post("/bookappointment",book);
router.get("/getAppointment/:email",getAppointment);
router.get("/getDetails",getDoctorDetails);

module.exports=router;
 